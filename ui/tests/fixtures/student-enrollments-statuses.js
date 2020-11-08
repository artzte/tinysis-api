// GET /api/statuses?enrollmentIds=53,50
export default {
  data: [
    {
      id: '85',
      type: 'status',
      attributes: {
        month: '2019-09-01',
        createdAt: '2019-11-15T00:00:00.000Z',
        updatedAt: '2019-11-15T00:00:00.000Z',
        fteHours: 25,
        metFteRequirements: true,
        heldPeriodicCheckins: true,
        academicStatus: 'satisfactory',
        attendanceStatus: 'satisfactory',
      },
      relationships: {
        creator: {
          data: {
            id: '319',
            type: 'user',
          },
        },
        statusable: {
          data: {
            id: '50',
            type: 'enrollment',
          },
        },
      },
    },
    {
      id: '86',
      type: 'status',
      attributes: {
        month: '2019-10-01',
        createdAt: '2019-11-15T00:00:00.000Z',
        updatedAt: '2019-11-15T00:00:00.000Z',
        fteHours: 25,
        metFteRequirements: true,
        heldPeriodicCheckins: true,
        academicStatus: 'satisfactory',
        attendanceStatus: 'satisfactory',
      },
      relationships: {
        creator: {
          data: {
            id: '319',
            type: 'user',
          },
        },
        statusable: {
          data: {
            id: '50',
            type: 'enrollment',
          },
        },
      },
    },
    {
      id: '87',
      type: 'status',
      attributes: {
        month: '2019-11-01',
        createdAt: '2019-11-15T00:00:00.000Z',
        updatedAt: '2019-11-15T00:00:00.000Z',
        fteHours: 25,
        metFteRequirements: true,
        heldPeriodicCheckins: true,
        academicStatus: 'satisfactory',
        attendanceStatus: 'satisfactory',
      },
      relationships: {
        creator: {
          data: {
            id: '319',
            type: 'user',
          },
        },
        statusable: {
          data: {
            id: '50',
            type: 'enrollment',
          },
        },
      },
    },
    {
      id: '94',
      type: 'status',
      attributes: {
        month: '2019-09-01',
        createdAt: '2019-11-15T00:00:00.000Z',
        updatedAt: '2019-11-15T00:00:00.000Z',
        fteHours: 25,
        metFteRequirements: true,
        heldPeriodicCheckins: true,
        academicStatus: 'satisfactory',
        attendanceStatus: 'satisfactory',
      },
      relationships: {
        creator: {
          data: {
            id: '320',
            type: 'user',
          },
        },
        statusable: {
          data: {
            id: '53',
            type: 'enrollment',
          },
        },
      },
    },
    {
      id: '95',
      type: 'status',
      attributes: {
        month: '2019-10-01',
        createdAt: '2019-11-15T00:00:00.000Z',
        updatedAt: '2019-11-15T00:00:00.000Z',
        fteHours: 25,
        metFteRequirements: true,
        heldPeriodicCheckins: true,
        academicStatus: 'satisfactory',
        attendanceStatus: 'satisfactory',
      },
      relationships: {
        creator: {
          data: {
            id: '320',
            type: 'user',
          },
        },
        statusable: {
          data: {
            id: '53',
            type: 'enrollment',
          },
        },
      },
    },
    {
      id: '96',
      type: 'status',
      attributes: {
        month: '2019-11-01',
        createdAt: '2019-11-15T00:00:00.000Z',
        updatedAt: '2019-11-15T00:00:00.000Z',
        fteHours: 25,
        metFteRequirements: true,
        heldPeriodicCheckins: true,
        academicStatus: 'satisfactory',
        attendanceStatus: 'satisfactory',
      },
      relationships: {
        creator: {
          data: {
            id: '320',
            type: 'user',
          },
        },
        statusable: {
          data: {
            id: '53',
            type: 'enrollment',
          },
        },
      },
    },
  ],
  included: [
    {
      id: '319',
      type: 'user',
      attributes: {
        firstName: 'Armanda',
        lastName: 'Heaney',
        nickname: null,
        dateActive: '2012-09-01',
        dateInactive: null,
        districtId: null,
        districtGrade: 12,
        email: 'cyrilkuhic@stoltenbergstehr.org',
        name: 'Armanda Heaney',
        status: 'active',
        role: 'staff',
      },
      relationships: {
        coordinatees: {
          data: [
            {
              id: '323',
              type: 'user',
            },
          ],
        },
      },
    },
    {
      id: '320',
      type: 'user',
      attributes: {
        firstName: 'Debbi',
        lastName: 'Leffler',
        nickname: null,
        dateActive: '2013-02-01',
        dateInactive: null,
        districtId: null,
        districtGrade: 12,
        email: 'isidro@streich.org',
        name: 'Debbi Leffler',
        status: 'active',
        role: 'staff',
      },
      relationships: {
        coordinatees: {
          data: [
            {
              id: '324',
              type: 'user',
            },
            {
              id: '325',
              type: 'user',
            },
          ],
        },
      },
    },
  ],
  meta: {
    count: 6,
  },
};
