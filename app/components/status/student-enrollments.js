/*
{{status/student-enrollments
  student=student
  enrollments=enrollments
  enrollmentStatuses=enrollmentStatuses
  term=term
}}
*/

import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { activeMonths } from 'tinysis-ui/utils/status-utils';
import { generateNotableHash } from 'tinysis-ui/utils/note-utils';

export default Component.extend({
  tinyData: service(),

  tagName: 'table',
  classNames: ['pure-table', 'pure-table-bordered'],

  statusHash: computed('enrollmentStatuses', function () {
    const { enrollmentStatuses } = this;

    return enrollmentStatuses.data.reduce((memo, status) => {
      const { enrollmentId } = status.attributes;
      const statuses = memo[enrollmentId] || {};
      statuses[status.attributes.month] = status;
      memo[enrollmentId] = statuses;
      return memo;
    }, {});
  }),

  months: computed('term', 'enrollment', function () {
    return activeMonths(this.term, this.tinyData.getToday());
  }),

  async didReceiveAttrs() {
    const { getNotes, notableHash, enrollmentStatuses } = this;
    if (notableHash) return;

    const notesResult = await getNotes(enrollmentStatuses);

    this.setProperties({
      notablesHash: generateNotableHash(notesResult, enrollmentStatuses, 'enrollmentId'),
    });
  },

});
