import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { sortTerms } from '../utils/term-utils';

export default Route.extend({
  tinyData: service(),
  model() {
    const student = this.modelFor('student');

    this.student = student.data;

    return this.tinyData.fetch(`/api/credit-assignments?studentIds=${student.data.id}&includeFulfilledAttributes=true&include=contractTerm,contractFacilitator,contract,notes,credit`);
  },
  setupController(controller, model) {
    this._super(controller, model);
    controller.setProperties({
      student: this.student,
      creditAssignments: model.data,
      terms: sortTerms(this.tinyData.get('term')),
    });
  },
  actions: {
    refreshModel() {
      this.refresh();
    },
  },
});
