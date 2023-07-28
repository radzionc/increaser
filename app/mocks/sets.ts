import { set, subDays } from 'date-fns'
import { MockProjectId } from 'projects/mocks'
import { getWeekday } from 'shared/utils/getWeekday'
import { memoize } from 'shared/utils/memoize'

type SetBoundaryDescriptor = [number, number]

type SetDescriptor = {
  start: SetBoundaryDescriptor
  end: SetBoundaryDescriptor
  projectId: MockProjectId
}

export const MOCK_SETS: SetDescriptor[][] = [
  [
    {
      start: [6, 7],
      end: [7, 26],
      projectId: MockProjectId.Job,
    },
    {
      start: [9, 29],
      end: [9, 38],
      projectId: MockProjectId.Job,
    },
    {
      start: [9, 48],
      end: [10, 23],
      projectId: MockProjectId.Job,
    },
    {
      start: [10, 29],
      end: [10, 50],
      projectId: MockProjectId.Job,
    },
    {
      start: [10, 55],
      end: [11, 7],
      projectId: MockProjectId.Job,
    },
    {
      start: [11, 14],
      end: [11, 32],
      projectId: MockProjectId.Job,
    },
    {
      start: [11, 36],
      end: [11, 52],
      projectId: MockProjectId.Job,
    },
    {
      start: [11, 56],
      end: [12, 4],
      projectId: MockProjectId.Job,
    },
    {
      start: [12, 49],
      end: [13, 6],
      projectId: MockProjectId.Job,
    },
    {
      start: [13, 11],
      end: [13, 49],
      projectId: MockProjectId.Job,
    },
    {
      start: [14, 20],
      end: [15, 15],
      projectId: MockProjectId.Job,
    },
    {
      start: [17, 12],
      end: [17, 30],
      projectId: MockProjectId.Language,
    },
    {
      start: [17, 35],
      end: [18, 10],
      projectId: MockProjectId.Language,
    },
  ],
  [
    {
      start: [6, 17],
      end: [6, 45],
      projectId: MockProjectId.Job,
    },
    {
      start: [6, 52],
      end: [7, 27],
      projectId: MockProjectId.Job,
    },
    {
      start: [7, 32],
      end: [7, 47],
      projectId: MockProjectId.Job,
    },
    {
      start: [10, 0],
      end: [10, 21],
      projectId: MockProjectId.Job,
    },
    {
      start: [10, 30],
      end: [10, 42],
      projectId: MockProjectId.Job,
    },
    {
      start: [10, 48],
      end: [11, 3],
      projectId: MockProjectId.Job,
    },
    {
      start: [11, 8],
      end: [11, 37],
      projectId: MockProjectId.Job,
    },
    {
      start: [11, 43],
      end: [11, 53],
      projectId: MockProjectId.Job,
    },
    {
      start: [11, 58],
      end: [12, 10],
      projectId: MockProjectId.Job,
    },
    {
      start: [12, 10],
      end: [12, 35],
      projectId: MockProjectId.Job,
    },
    {
      start: [12, 35],
      end: [12, 55],
      projectId: MockProjectId.Job,
    },
    {
      start: [13, 38],
      end: [14, 9],
      projectId: MockProjectId.Job,
    },
    {
      start: [14, 11],
      end: [14, 22],
      projectId: MockProjectId.Job,
    },
    {
      start: [16, 7],
      end: [16, 27],
      projectId: MockProjectId.ProgrammingStudy,
    },
    {
      start: [16, 27],
      end: [16, 51],
      projectId: MockProjectId.ProgrammingStudy,
    },
    {
      start: [16, 51],
      end: [16, 57],
      projectId: MockProjectId.ProgrammingStudy,
    },
    {
      start: [17, 5],
      end: [17, 24],
      projectId: MockProjectId.ProgrammingStudy,
    },
    {
      start: [17, 28],
      end: [17, 43],
      projectId: MockProjectId.ProgrammingStudy,
    },
  ],
  [
    {
      start: [6, 22],
      end: [7, 44],
      projectId: MockProjectId.Business,
    },

    {
      start: [10, 28],
      end: [11, 2],
      projectId: MockProjectId.Job,
    },
    {
      start: [11, 8],
      end: [11, 45],
      projectId: MockProjectId.Job,
    },
    {
      start: [11, 48],
      end: [12, 6],
      projectId: MockProjectId.Job,
    },
    {
      start: [12, 11],
      end: [12, 32],
      projectId: MockProjectId.Job,
    },
    {
      start: [13, 24],
      end: [13, 54],
      projectId: MockProjectId.Job,
    },
    {
      start: [14, 2],
      end: [14, 23],
      projectId: MockProjectId.Job,
    },
    {
      start: [14, 26],
      end: [14, 47],
      projectId: MockProjectId.Job,
    },
    {
      start: [14, 50],
      end: [15, 30],
      projectId: MockProjectId.Job,
    },
    {
      start: [16, 27],
      end: [16, 45],
      projectId: MockProjectId.ProgrammingStudy,
    },
    {
      start: [16, 45],
      end: [16, 57],
      projectId: MockProjectId.ProgrammingStudy,
    },
    {
      start: [16, 59],
      end: [17, 13],
      projectId: MockProjectId.ProgrammingStudy,
    },
    {
      start: [17, 21],
      end: [17, 38],
      projectId: MockProjectId.Business,
    },
    {
      start: [17, 42],
      end: [17, 54],
      projectId: MockProjectId.Business,
    },
  ],
  [
    {
      start: [6, 45],
      end: [7, 4],
      projectId: MockProjectId.Business,
    },
    {
      start: [7, 4],
      end: [7, 9],
      projectId: MockProjectId.Business,
    },
    {
      start: [7, 12],
      end: [7, 35],
      projectId: MockProjectId.Business,
    },
    {
      start: [7, 40],
      end: [7, 55],
      projectId: MockProjectId.Business,
    },
    {
      start: [7, 59],
      end: [8, 9],
      projectId: MockProjectId.Business,
    },
    {
      start: [10, 42],
      end: [11, 6],
      projectId: MockProjectId.Job,
    },
    {
      start: [11, 10],
      end: [11, 28],
      projectId: MockProjectId.Job,
    },
    {
      start: [11, 29],
      end: [11, 42],
      projectId: MockProjectId.Job,
    },
    {
      start: [11, 46],
      end: [11, 55],
      projectId: MockProjectId.Job,
    },
    {
      start: [12, 4],
      end: [12, 33],
      projectId: MockProjectId.Job,
    },
    {
      start: [12, 36],
      end: [12, 46],
      projectId: MockProjectId.Job,
    },
    {
      start: [12, 46],
      end: [12, 56],
      projectId: MockProjectId.Job,
    },
    {
      start: [13, 27],
      end: [14, 15],
      projectId: MockProjectId.Job,
    },
    {
      start: [14, 25],
      end: [15, 18],
      projectId: MockProjectId.Job,
    },
  ],
  [
    {
      start: [6, 14],
      end: [6, 59],
      projectId: MockProjectId.ProgrammingStudy,
    },
    {
      start: [7, 10],
      end: [7, 29],
      projectId: MockProjectId.ProgrammingStudy,
    },
    {
      start: [7, 31],
      end: [7, 42],
      projectId: MockProjectId.ProgrammingStudy,
    },
    {
      start: [11, 3],
      end: [11, 29],
      projectId: MockProjectId.Job,
    },
    {
      start: [11, 31],
      end: [12, 15],
      projectId: MockProjectId.Job,
    },
    {
      start: [12, 22],
      end: [12, 32],
      projectId: MockProjectId.Job,
    },
    {
      start: [12, 34],
      end: [12, 45],
      projectId: MockProjectId.Job,
    },
    {
      start: [12, 45],
      end: [12, 51],
      projectId: MockProjectId.Job,
    },
    {
      start: [12, 59],
      end: [13, 11],
      projectId: MockProjectId.Job,
    },
    {
      start: [13, 20],
      end: [13, 38],
      projectId: MockProjectId.Job,
    },
    {
      start: [14, 14],
      end: [14, 40],
      projectId: MockProjectId.Job,
    },
    {
      start: [16, 13],
      end: [16, 59],
      projectId: MockProjectId.Business,
    },
    {
      start: [17, 5],
      end: [17, 12],
      projectId: MockProjectId.Content,
    },
    {
      start: [17, 16],
      end: [17, 25],
      projectId: MockProjectId.Content,
    },
    {
      start: [17, 26],
      end: [17, 33],
      projectId: MockProjectId.Content,
    },
  ],
  [
    {
      start: [10, 31],
      end: [11, 5],
      projectId: MockProjectId.ProgrammingStudy,
    },

    {
      start: [11, 10],
      end: [11, 30],
      projectId: MockProjectId.ProgrammingStudy,
    },
    {
      start: [11, 40],
      end: [12, 30],
      projectId: MockProjectId.ProgrammingStudy,
    },
    {
      start: [14, 20],
      end: [15, 6],
      projectId: MockProjectId.Content,
    },
    {
      start: [15, 14],
      end: [15, 46],
      projectId: MockProjectId.Content,
    },
  ],
  [
    {
      start: [10, 29],
      end: [11, 23],
      projectId: MockProjectId.Business,
    },
    {
      start: [11, 29],
      end: [11, 50],
      projectId: MockProjectId.Business,
    },
    {
      start: [14, 55],
      end: [15, 32],
      projectId: MockProjectId.Language,
    },
    {
      start: [15, 36],
      end: [16, 4],
      projectId: MockProjectId.Language,
    },
  ],
]

export const getMockSets = memoize(() => {
  const today = new Date()
  const weekday = getWeekday(today)
  const now = Date.now()

  const thisWeek = MOCK_SETS.slice(0, weekday).reverse()
  const previousWeek = MOCK_SETS.slice(weekday).reverse()

  return [...thisWeek, ...previousWeek]
    .map((sets, daysAgo) => {
      const date = subDays(today, daysAgo)

      const getTimestamp = ([hour, minute]: SetBoundaryDescriptor) =>
        set(date, { hours: hour, minutes: minute }).getTime()

      return sets.map((set) => ({
        ...set,
        start: getTimestamp(set.start),
        end: getTimestamp(set.end),
      }))
    })
    .flat()
    .filter((set) => set.end < now)
})
