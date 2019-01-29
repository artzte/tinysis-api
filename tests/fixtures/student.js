export default {
  data: {
    id: '4',
    type: 'user',
    attributes: {
      firstName: 'Senaida',
      lastName: 'Robel',
      nickname: null,
      dateActive: '2018-08-01',
      dateInactive: null,
      status: 'active',
      role: 'student',
      districtId: null,
      districtGrade: null,
      coordinatorId: '1',
    },
    relationships: {
      coordinator: {
        data: {
          id: '1',
          type: 'coordinator',
        },
      },
    },
  },
};
