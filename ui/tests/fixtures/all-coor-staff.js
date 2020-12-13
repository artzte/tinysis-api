// GET /api/staff?status=active&coordinators=true&order=lastName,firstName
export default {
  data: [
    {
      id: '106',
      type: 'user',
      attributes: {
        firstName: 'Joseph',
        lastName: 'Bartell',
        nickname: null,
        status: 'active',
        role: 'administrator',
        isStaff: true,
      },
      relationships: {
        coordinatees: {
          data: [

          ],
        },
      },
    },
    {
      id: '108',
      type: 'user',
      attributes: {
        firstName: 'Loren',
        lastName: 'Bernhard',
        nickname: null,
        status: 'active',
        role: 'staff',
        isStaff: true,
      },
      relationships: {
        coordinatees: {
          data: [
            {
              id: '112',
              type: 'user',
            },
            {
              id: '113',
              type: 'user',
            },
          ],
        },
      },
    },
    {
      id: '110',
      type: 'user',
      attributes: {
        firstName: 'Bianca',
        lastName: 'Boyle',
        nickname: null,
        status: 'active',
        role: 'administrator',
        isStaff: true,
      },
      relationships: {
        coordinatees: {
          data: [

          ],
        },
      },
    },
    {
      id: '107',
      type: 'user',
      attributes: {
        firstName: 'Tommie',
        lastName: 'Keebler',
        nickname: null,
        status: 'active',
        role: 'staff',
        isStaff: true,
      },
      relationships: {
        coordinatees: {
          data: [
            {
              id: '111',
              type: 'user',
            },
          ],
        },
      },
    },
  ],
  meta: {
    count: 4,
  },
};
