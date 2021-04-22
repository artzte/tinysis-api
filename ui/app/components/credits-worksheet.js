import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import dayjs from 'dayjs';
import { replaceModel } from '../utils/json-api';
import clone from '../utils/clone';

export default class CreditsWorksheet extends Component {
  @service('tinyData') tinyData;

  @tracked selectedCredits = [];

  @tracked showCombineDialog = false;

  @tracked combineModel = null;

  today = new Date();

  @action async combineCredits(combineModel) {
    const { student } = this.args;
    const url = `/api/students/${student.id}/credit-assignments`;

    const model = clone(combineModel);

    if (!model.attributes.enableOverride) {
      delete model.attributes.creditsOverride;
    }
    delete model.attributes.enableOverride;

    const newCreditAssignment = await this.tinyData.fetch(url, {
      method: 'POST',
      data: {
        data: model,
      },
    });

    const note = (combineModel.attributes.note || '').trim();
    if (note) {
      await this.createNote(newCreditAssignment.data, note);
    }

    this.hideCombineDialog();

    this.send('refreshModel');

    this.flashMessages.success('Credits were combined.');
  }

  @action async splitCredit(creditAssignment) {
    const url = `/api/credit-assignments/${creditAssignment.id}`;

    await this.tinyData.fetch(url, {
      method: 'DELETE',
    });

    this.flashMessages.success('Credits were split.');
  }

  @action hideCombine() {
    this.showCombineDialog = false;
  }

  @action async showCombine() {
    if (!this.terms) {
      const terms = await this.tinyData.fetch('/api/terms?status=active');
      this.terms = terms.data;
    }

    this.combineModel = buildCombineModel(this.selectedCredits, this.tinyData);

    this.showCombineDialog = true;
  }

  @action async approveCredit(creditAssignment) {
    const { student } = this;
    const isApproved = Boolean(creditAssignment.attributes.districtFinalizeApprovedOn);
    const districtFinalizeApprovedOn = dayjs().format('YYYY-MM-DD');
    let url;

    if (isApproved) {
      url = `/api/students/${student.id}/credit-assignments/${creditAssignment.id}/unapprove`;
    } else {
      url = `/api/students/${student.id}/credit-assignments/${creditAssignment.id}/approve`;
    }

    const newCreditAssignment = await this.tinyData.fetch(url, {
      method: 'PUT',
      data: {
        data: {
          attributes: {
            districtFinalizeApprovedOn,
          },
        },
      },
    });

    const { creditAssignments } = this;
    this.args.updateCreditAssignments(replaceModel(creditAssignments, newCreditAssignment.data));

    return newCreditAssignment;
  }

  get combineLinkDisabled() {
    return this.selectedCredits.length < 2;
  }

  get unfinalizedCredits() {
    return this.args.creditAssignments
      .filter(ca => !ca.relationships.creditTransmittalBatch.data)
      .filter(ca => !ca.relationships.parentCreditAssignment.data);
  }

  get viewModels() {
    const { tinyData } = this;
    return this.unfinalizedCredits
      .map(creditAssignment => ({
        creditAssignment,
        credit: tinyData.get('credit', creditAssignment.relationships.credit.data.id),
      }))
      .sort((vm1, vm2) => vm1.credit.attributes.courseName.localeCompare(vm2.credit.attributes.courseName));
  }

  @action selectCredit(creditAssignment) {
    const { selectedCredits } = this;
    if (selectedCredits.find(ca => ca === creditAssignment)) {
      this.selectedCredits = selectedCredits.filter(ca => ca !== creditAssignment);
    } else {
      this.selectedCredits = selectedCredits.concat([creditAssignment]);
    }
  }
}
