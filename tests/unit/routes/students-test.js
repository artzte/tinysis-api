import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | students', (hooks) => {
  setupTest(hooks);

  test('it exists', function (assert) {
    const route = this.owner.lookup('route:students');
    assert.ok(route);
  });
});
