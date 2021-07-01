// GET /api/enrollments?contractIds=11&include=turnins,participant
export default {
  data: [
    {
      id: '15',
      type: 'enrollment',
      attributes: {
        finalizedOn: null,
        enrollmentStatus: 'enrolled',
        completionStatus: 'incomplete',
      },
      relationships: {
        contract: {
          data: {
            id: '11',
            type: 'contract',
          },
        },
        participant: {
          data: {
            id: '53',
            type: 'user',
          },
        },
        creditAssignments: {
          data: [
            {
              id: '54',
              type: 'creditAssignment',
            },
          ],
        },
        turnins: {
          data: [

          ],
        },
        meetingParticipants: {
          data: [
            {
              id: '3',
              type: 'meetingParticipant',
            },
            {
              id: '6',
              type: 'meetingParticipant',
            },
            {
              id: '9',
              type: 'meetingParticipant',
            },
            {
              id: '12',
              type: 'meetingParticipant',
            },
            {
              id: '15',
              type: 'meetingParticipant',
            },
          ],
        },
      },
    },
    {
      id: '13',
      type: 'enrollment',
      attributes: {
        finalizedOn: null,
        enrollmentStatus: 'enrolled',
        completionStatus: 'incomplete',
      },
      relationships: {
        contract: {
          data: {
            id: '11',
            type: 'contract',
          },
        },
        participant: {
          data: {
            id: '51',
            type: 'user',
          },
        },
        creditAssignments: {
          data: [
            {
              id: '52',
              type: 'creditAssignment',
            },
          ],
        },
        turnins: {
          data: [
            {
              id: '1',
              type: 'turnin',
            },
            {
              id: '2',
              type: 'turnin',
            },
            {
              id: '3',
              type: 'turnin',
            },
            {
              id: '4',
              type: 'turnin',
            },
            {
              id: '5',
              type: 'turnin',
            },
          ],
        },
        meetingParticipants: {
          data: [
            {
              id: '1',
              type: 'meetingParticipant',
            },
            {
              id: '4',
              type: 'meetingParticipant',
            },
            {
              id: '7',
              type: 'meetingParticipant',
            },
            {
              id: '10',
              type: 'meetingParticipant',
            },
            {
              id: '13',
              type: 'meetingParticipant',
            },
          ],
        },
      },
    },
    {
      id: '14',
      type: 'enrollment',
      attributes: {
        finalizedOn: null,
        enrollmentStatus: 'enrolled',
        completionStatus: 'incomplete',
      },
      relationships: {
        contract: {
          data: {
            id: '11',
            type: 'contract',
          },
        },
        participant: {
          data: {
            id: '52',
            type: 'user',
          },
        },
        creditAssignments: {
          data: [
            {
              id: '53',
              type: 'creditAssignment',
            },
          ],
        },
        turnins: {
          data: [

          ],
        },
        meetingParticipants: {
          data: [
            {
              id: '2',
              type: 'meetingParticipant',
            },
            {
              id: '5',
              type: 'meetingParticipant',
            },
            {
              id: '8',
              type: 'meetingParticipant',
            },
            {
              id: '11',
              type: 'meetingParticipant',
            },
            {
              id: '14',
              type: 'meetingParticipant',
            },
          ],
        },
      },
    },
  ],
  included: [
    {
      id: '53',
      type: 'user',
      attributes: {
        firstName: 'Glennie',
        lastName: 'Gutkowski',
        nickname: null,
        dateActive: '2018-08-01',
        dateInactive: '2019-10-01',
        districtId: '5594787411',
        districtGrade: 12,
        email: 'royce@stark.biz',
        name: 'Glennie Gutkowski',
        status: 'inactive',
        role: 'student',
        isStaff: false,
      },
      relationships: {
        coordinator: {
          data: {
            id: '48',
            type: 'user',
          },
        },
      },
    },
    {
      id: '1',
      type: 'turnin',
      attributes: {
        status: 'complete',
      },
      relationships: {
        assignment: {
          data: {
            id: '1',
            type: 'assignment',
          },
        },
        enrollment: {
          data: {
            id: '13',
            type: 'enrollment',
          },
        },
      },
    },
    {
      id: '2',
      type: 'turnin',
      attributes: {
        status: 'complete',
      },
      relationships: {
        assignment: {
          data: {
            id: '2',
            type: 'assignment',
          },
        },
        enrollment: {
          data: {
            id: '13',
            type: 'enrollment',
          },
        },
      },
    },
    {
      id: '3',
      type: 'turnin',
      attributes: {
        status: 'complete',
      },
      relationships: {
        assignment: {
          data: {
            id: '3',
            type: 'assignment',
          },
        },
        enrollment: {
          data: {
            id: '13',
            type: 'enrollment',
          },
        },
      },
    },
    {
      id: '4',
      type: 'turnin',
      attributes: {
        status: 'complete',
      },
      relationships: {
        assignment: {
          data: {
            id: '4',
            type: 'assignment',
          },
        },
        enrollment: {
          data: {
            id: '13',
            type: 'enrollment',
          },
        },
      },
    },
    {
      id: '5',
      type: 'turnin',
      attributes: {
        status: 'complete',
      },
      relationships: {
        assignment: {
          data: {
            id: '5',
            type: 'assignment',
          },
        },
        enrollment: {
          data: {
            id: '13',
            type: 'enrollment',
          },
        },
      },
    },
    {
      id: '51',
      type: 'user',
      attributes: {
        firstName: 'Wilburn',
        lastName: 'Hirthe',
        nickname: null,
        dateActive: '2018-08-01',
        dateInactive: null,
        districtId: '735019319',
        districtGrade: 9,
        email: 'reid.bruen@hane-stroman.info',
        name: 'Wilburn Hirthe',
        status: 'active',
        role: 'student',
        isStaff: false,
      },
      relationships: {
        coordinator: {
          data: {
            id: '47',
            type: 'user',
          },
        },
      },
    },
    {
      id: '52',
      type: 'user',
      attributes: {
        firstName: 'Brittny',
        lastName: 'Ritchie',
        nickname: null,
        dateActive: '2018-08-01',
        dateInactive: null,
        districtId: '9669838669',
        districtGrade: 10,
        email: 'sharell.nader@king.info',
        name: 'Brittny Ritchie',
        status: 'active',
        role: 'student',
        isStaff: false,
      },
      relationships: {
        coordinator: {
          data: {
            id: '48',
            type: 'user',
          },
        },
      },
    },
  ],
  meta: {
    count: 3,
  },
};
