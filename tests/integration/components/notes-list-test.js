import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {
  render, find, findAll, click,
} from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import { generateNotableHash } from 'tinysis-ui/utils/note-utils';
import notesCoorStatuses from '../../fixtures/notes-coor-statuses';
import coorStatuses from '../../fixtures/coor-statuses';

import { stubTinyData } from '../../helpers/stub-tiny-data';
import staffFixture from '../../fixtures/staff';

let notableHash;
let tinyData;

module('Integration | Component | notes-list', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    tinyData = stubTinyData();
    tinyData.addResult(staffFixture);

    notableHash = generateNotableHash(notesCoorStatuses, coorStatuses.data, 'id');

    [this.notable] = coorStatuses.data;

    // insert another note so two li's
    notableHash[this.notable.id] = notableHash[this.notable.id].concat(notableHash[this.notable.id]);

    this.notes = notableHash[this.notable.id];
  });

  test('it renders expanded', async function (assert) {
    await render(hbs`
      {{notes-list
        notes=notes
        notable=status
        expanded=true
      }}
    `);

    assert.matches(find('ul').textContent, new RegExp(this.notes[0].attributes.note));
    assert.equal(findAll('li.notes-list-item').length, this.notes.length, 'expected correct number of list items');
  });

  test('it renders collapsed and is then expanded', async function (assert) {
    await render(hbs`
      {{notes-list
        notes=notes
        notable=status
        expanded=false
      }}
    `);

    assert.equal(findAll('li').length, 0, 'list items are not rendered in collapsed state');
    await click('.expand-notes');
    assert.equal(findAll('li.notes-list-item').length, this.notes.length, 'expanded, see the expected number of list items');
  });
});
