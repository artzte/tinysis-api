import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import CreditAssignmentsCreateEditDialog, {
  creditsRegex,
  creditAssignmentValidationRules,
  creditAssignmentRelationshipValidationRules,
} from './create-edit-dialog';
import Validator from '../../utils/validator';

// credits allow a number followed by an optional, constrained decimal fraction,
// or a decimal with no whole number
//
export default class CreditAssignmentsCombineDialog extends CreditAssignmentsCreateEditDialog {
  validator = new Validator({
    ...creditAssignmentValidationRules,
    creditHours: {
      type: 'format',
      regex: creditsRegex,
      message: 'Invalid credit value - please override with a value having a 0.25 multiple',
      if: (key, value, pojo) => !pojo.enableOverride,
    },
    overrideHours: {
      type: 'format',
      regex: creditsRegex,
      message: 'Invalid override value - please override with a value having a 0.25 multiple',
      if: (key, value, pojo) => pojo.enableOverride,
    },
  });

  validateRelationships = new Validator({
    ...creditAssignmentRelationshipValidationRules,
    credit: { type: 'required' },
    contractTerm: { type: 'required' },
  });

  @tracked enableOverride = false;

  @action registerElement(element) {
    this.element = element;
  }

  // eslint-disable-next-line class-methods-use-this
  @action setFocusToOverrideField(input) {
    input.focus();
    input.select();
  }
}
