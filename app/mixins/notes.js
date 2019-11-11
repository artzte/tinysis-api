import Mixin from '@ember/object/mixin';
import { inject as service } from '@ember/service';
import { dasherize } from '@ember/string';

export default Mixin.create({
  tinyData: service(),

  getNotes(notables) {
    const [firstNotable] = notables;
    if (!firstNotable) return Promise.resolve({ data: [], meta: { count: 0 } });

    const notableType = firstNotable.type;
    const notableIds = notables.map(notable => notable.id);
    return this.tinyData.fetch('/api/notes', {
      params: {
        notableType,
        notableIds: notableIds.join(','),
      },
    });
  },

  createNote(notable, note) {
    const {
      type,
      id,
    } = notable;
    return this.tinyData.fetch(`/api/notes/${dasherize(type)}/${id}`, {
      method: 'POST',
      body: JSON.stringify({
        data: {
          attributes: {
            note,
          },
        },
      }),
    });
  },
});
