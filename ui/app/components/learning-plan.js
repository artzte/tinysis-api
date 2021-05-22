import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class LearningPlanComponent extends Component {
  @service('tinyData') tinyData;

  @tracked isEditing = false;

  @tracked allLearningPlanGoals = null;

  @tracked _learningPlan = null;

  constructor(...args) {
    super(...args);

    this.years = this.tinyData.getYears();
  }

  get learningPlan() {
    return this._learningPlan || this.args.learningPlan;
  }

  set learningPlan(newPlan) {
    this._learningPlan = newPlan;
  }

  get hasUserGoals() {
    return this.isEditing || this.args.learningPlan.attributes.userGoals;
  }

  get hasLearningPlan() {
    return Boolean(this.learningPlan.id !== null);
  }

  get learningPlanGoals() {
    const {
      tinyData,
      learningPlan,
      isEditing,
    } = this;

    if (isEditing) {
      const { allLearningPlanGoals } = this;
      if (!allLearningPlanGoals) return [];

      return allLearningPlanGoals;
    }

    return learningPlan
      .relationships
      .learningPlanGoals
      .data
      .map(ref => tinyData.get('learningPlanGoal', ref.id));
  }

  @action async createLearningPlan() {
    const result = await this.tinyData.fetch(`/api/learning-plan-goals/${this.args.year}`, {
      method: 'POST',
      data: {
        year: this.args.year,
      },
    });
    this._learningPlan = result.data;
  }

  @action async edit() {
    if (!this.allLearningPlanGoals) {
      const result = await this.tinyData.fetch(`/api/learning-plan-goals/${this.args.year}`);
      this.allLearningPlanGoals = result.data;
    }
    this.isEditing = true;
  }

  @action async onSave(model) {
    const result = await this.tinyData.fetch(`/api/learning-plans/${model.id}`, {
      method: 'PUT',
      data: model,
    });

    this._learningPlan = result.data;
    this.isEditing = false;
  }

  @action cancel() {
    this.isEditing = false;
  }
}
