import Component from '@ember/component';
import { computed } from '@ember/object';
import Validator from '../utils/validator';
import clone from '../utils/clone';

export default Component.extend({
  showErrors: false,
  classNames: ['t-form'],
  tagName: 'form',

  validator: computed(() => new Validator({})),

  didReceiveAttrs() {
    if (this.lastModel === this.model) {
      return;
    }

    const pojo = this.normalizeModel(this.model);

    this.lastModel = this.model;

    this.set('pojo', pojo);

    this.validate();
  },

  didInsertElement() {
    const autofocus = this.element.querySelector('input[autofocus]');

    if (autofocus) {
      autofocus.focus();
      autofocus.select();
    }
  },

  normalizeModel(model) {
    return clone(model.attributes);
  },

  serializeModel(pojo, model) {
    return {
      ...model,
      attributes: {
        ...pojo,
      },
    };
  },

  updatePojo(updates) {
    const { pojo } = this;

    const newPojo = {
      ...pojo,
      ...updates,
    };

    this.setProperties({
      pojo: newPojo,
      showErrors: true,
    });

    this.validate();
  },

  handleAttributeChange(name, newValue) {
    const updates = {
      [name]: newValue,
    };

    this.updatePojo(updates);
  },

  validate() {
    const validationResult = this.validator.validate(this.pojo);

    this.setProperties(validationResult);
  },

  change(event) {
    const { name, value } = event.target;

    this.handleAttributeChange(name, value);
  },

  submit(event) {
    event.preventDefault();

    if (this.isInvalid) {
      if (this.reportError) {
        this.reportError(this.errors);
      }
      return;
    }

    const { pojo, model } = this;

    this.save(this.serializeModel(pojo, model));
  },
});
