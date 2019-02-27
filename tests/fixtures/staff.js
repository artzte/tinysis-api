export default {
  data: [
    {
      id: '1',
      type: 'user',
      attributes: {
        firstName: 'Jaime',
        lastName: 'Frami',
        nickname: null,
        dateActive: null,
        dateInactive: null,
        status: 'active',
        role: 'staff',
        email: null,
      },
      relationships: {
        coordinatees: {
          data: [
            {
              id: '4',
              type: 'student',
            },
          ],
        },
      },
    },
    {
      id: '2',
      type: 'user',
      attributes: {
        firstName: 'Reagan',
        lastName: 'Cartwright',
        nickname: null,
        dateActive: null,
        dateInactive: null,
        status: 'active',
        role: 'staff',
        email: null,
      },
      relationships: {
        coordinatees: {
          data: [
            {
              id: '5',
              type: 'student',
            },
            {
              id: '6',
              type: 'student',
            },
          ],
        },
      },
    },
    {
      id: '3',
      type: 'user',
      attributes: {
        firstName: 'Phil',
        lastName: 'Cruickshank',
        nickname: null,
        dateActive: null,
        dateInactive: '2018-01-01',
        status: 'inactive',
        role: 'staff',
        email: null,
      },
      relationships: {
        coordinatees: {
          data: [

          ],
        },
      },
    },
  ],
  meta: {
    count: 3,
  },
};
