import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {
  render,
  find,
  findAll,
  click,
  fillIn,
  waitFor,
  select,
} from '@ember/test-helpers';
import { resolve } from 'rsvp';
import hbs from 'htmlbars-inline-precompile';
import { stubCreditAssignment } from 'tinysis-ui/services/credit-assignment';
import { buildCombineModel } from 'tinysis-ui/utils/credit-utils';

import studentCreditAssignmentsFixture from '../../../fixtures/student-credit-assignments';
import creditsFixture from '../../../fixtures/credits-index';
import termsFixture from '../../../fixtures/terms';
import { stubTinyData } from '../../../helpers/stub-tiny-data';

let tinyData;
let combineModel;
let creditAssignments;
let credits;
let terms;
let creditsToCombine;
let requests;

module('Integration | Component | CreditAssignments::CombineDialog', hooks => {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.owner.register('service:credit-assignment', stubCreditAssignment);

    tinyData = stubTinyData();
    tinyData.addResult(studentCreditAssignmentsFixture);
    tinyData.addResult(creditsFixture);
    tinyData.addResult(termsFixture);

    credits = tinyData.get('credit');
    creditAssignments = tinyData.get('creditAssignment');
    terms = tinyData.get('term');

    this.owner.lookup('service:credit-assignment').mockTinyData(tinyData);

    creditsToCombine = creditAssignments
      .filter(ca => ca.relationships.user.data)
      .slice(0, 3);

    requests = [];

    combineModel = buildCombineModel(creditsToCombine, tinyData);

    this.setProperties({
      creditsToCombine,
      credits,
      terms,
      today: new Date(2019, 8, 1),
      combineModel,
      save: model => {
        requests.push({ type: 'save', model });
        return resolve(model);
      },
      reportError: errors => {
        requests.push({ type: 'error', errors });
      },
      close: () => {
        requests.push({ type: 'close' });
      },
    });
  });

  function renderComponent() {
    return render(hbs`
      <CreditAssignments::CombineDialog
        @model={{combineModel}}
        @creditAssignments={{creditsToCombine}}
        @today={{today}}
        @terms={{terms}}
        @save={{fn this.save}}
        @close={{fn this.close}}
        @reportError={{fn this.reportError}}
      />
    `);
  }

  test('it renders and can post through a default combined credit', async assert => {
    await renderComponent();

    assert.ok(find('form'), 'the form rendered');

    assert.equal(findAll('[data-test-credit-assignment-id]').length, creditsToCombine.length, 'expected summary of child credit assignments displayed');

    const termSelect = find('select[name="contractTerm"]');
    const creditSelect = find('t-type-ahead[data-test-name="credit"]');
    const hoursSpan = find('span[data-test-override-hours]');

    assert.ok(termSelect, 'rendered term input');
    assert.ok(creditSelect, 'rendered credit input');
    assert.ok(hoursSpan, 'rendered hours span');

    const [firstCredit] = creditsToCombine;

    const expectedTermOption = find(`select[name="contractTerm"] option[value="${firstCredit.relationships.contractTerm.data.id}"]`);
    const expectedCreditOption = find(`t-type-ahead[data-test-name="credit"] [data-test-value="${firstCredit.relationships.credit.data.id}"]`);

    assert.ok(expectedTermOption, 'found expected term selection');
    assert.ok(expectedCreditOption, 'found expected credit selection');
    assert.ok(expectedTermOption.selected, 'expected term option is selected');

    const computedCredits = creditsToCombine.reduce((sum, ca) => {
      sum = ca.attributes.creditHours + sum;
      return sum;
    }, 0);

    assert.equal(combineModel.attributes.creditHours, computedCredits, 'the combined sum of credit hours of the credit assignments being merged, is correct on the built combine model');

    let creditHours = find('span[data-test-override-hours]');
    assert.ok(creditHours, 'creditHours static field is rendered');

    assert.matches(creditHours.textContent, computedCredits.toString(), 'expected default credit hours');

    await click('[data-test-toggle-override]');

    creditHours = find('input[data-test-override-hours]');
    assert.ok(creditHours, 'overrideHours input field is rendered');

    assert.matches(creditHours.value, computedCredits.toString(), 'expected default credit hours');

    await click('button');

    assert.equal(requests.length, 1, 'an action call was made');

    const request = requests.pop();

    assert.equal(request.type, 'save', 'a save request was sent');
    assert.ok(request.model, 'a model was sent');
    assert.equal(request.model.relationships.contractTerm.data.id, firstCredit.relationships.contractTerm.data.id, 'correct term');
    assert.equal(request.model.relationships.credit.data.id, firstCredit.relationships.credit.data.id, 'correct credit');
    assert.equal(request.model.attributes.creditHours, '1.25', 'correct credit hours');
  });

  test('it renders a combined credit and then reports and recovers from validation failure', async assert => {
    await renderComponent();

    assert.ok(find('form'), 'the form rendered');

    await click('[data-test-toggle-override]');
    await fillIn('[data-test-override-hours]', '');

    // select the prompt (no selection)
    await select('select[name="contractTerm"]', '');

    await click('t-type-ahead[data-test-name="credit"] [data-test-clear-selection]');

    await click('button[type="submit"]');

    assert.equal(requests.length, 1, 'one request was made');

    let [request] = requests;

    assert.matches(request.type, 'error', 'error reported');

    assert.ok(request.errors, 'with an error object');

    ['overrideHours', 'contractTerm', 'credit'].forEach(field => {
      assert.ok(request.errors[field], `${field} was flagged`);
    });

    const termId = terms[0].id;
    await select('select[name="contractTerm"]', termId);
    await fillIn('t-type-ahead input', 'ding');
    await waitFor('ul.search-results');

    const [selectCredit] = credits;
    await click(`ul.search-results [data-test-value="${selectCredit.id}"]`);

    await fillIn('[data-test-override-hours]', '0.5');

    await click('button[type="submit"]');

    [, request] = requests;
    assert.ok(request, 'another request received');
    assert.ok(request.model, 'model was provided');
    assert.equal(request.type, 'save', 'it was a save request');
    assert.equal(request.model.relationships.contractTerm.data.id, termId);
  });

  test('it does not permit submittal with invalid computed credit, but permits submittal with valid overridden credit', async function (assert) {
    creditsToCombine.forEach(ca => {
      ca.attributes.creditHours = 0.111;
    });

    this.combineModel = buildCombineModel(creditsToCombine, tinyData);

    await renderComponent();

    await click('button[type="submit"]');

    let request = requests.shift();

    assert.ok(request, 'a request was made');
    assert.equal(request.type, 'error', 'error reported');
    assert.ok(request.errors.creditHours, 'message reported regarding credit hours');

    await click('[data-test-toggle-override]');
    await fillIn('input[data-test-override-hours]', '.25');
    await click('button[type="submit"]');

    request = requests.shift();

    assert.ok(request, 'a request was made');
    assert.equal(request.type, 'save', 'save reported');
    assert.ok(request.model, 'model included');
    assert.equal(request.model.attributes.overrideHours, '.25', 'override saved');
  });
});
