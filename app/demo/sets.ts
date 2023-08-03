import { getWeekday } from 'shared/utils/getWeekday'
import { DemoProject } from './projects'
import { startOfWeek } from 'date-fns'
import { MS_IN_DAY, MS_IN_HOUR } from 'utils/time'
import { MS_IN_MIN } from '@increaser/ui/shared/utils/time'

type SetBoundaryDescriptor = [number, number]

interface SetDescription {
  start: SetBoundaryDescriptor
  end: SetBoundaryDescriptor
  projectId: DemoProject
}

type DaySetsDescription = SetDescription[]

const daySetsDescription: DaySetsDescription[] = [
  [
    {
      start: [8, 30],
      end: [9, 5],
      projectId: DemoProject.Planning,
    },
    {
      start: [9, 10],
      end: [9, 38],
      projectId: DemoProject.Content,
    },
    {
      start: [9, 48],
      end: [10, 23],
      projectId: DemoProject.Content,
    },

    {
      start: [10, 55],
      end: [11, 30],
      projectId: DemoProject.Job,
    },
    {
      start: [11, 35],
      end: [12, 10],
      projectId: DemoProject.Job,
    },
    {
      start: [12, 15],
      end: [12, 40],
      projectId: DemoProject.Job,
    },

    {
      start: [14, 25],
      end: [15, 15],
      projectId: DemoProject.Job,
    },
    {
      start: [15, 20],
      end: [15, 55],
      projectId: DemoProject.Job,
    },
    {
      start: [16, 2],
      end: [16, 40],
      projectId: DemoProject.Job,
    },
  ],
  [
    {
      start: [8, 20],
      end: [9, 10],
      projectId: DemoProject.Business,
    },
    {
      start: [9, 15],
      end: [9, 48],
      projectId: DemoProject.Business,
    },
    {
      start: [9, 50],
      end: [10, 15],
      projectId: DemoProject.Business,
    },

    {
      start: [10, 45],
      end: [11, 30],
      projectId: DemoProject.Job,
    },
    {
      start: [11, 35],
      end: [12, 10],
      projectId: DemoProject.Job,
    },
    {
      start: [12, 15],
      end: [12, 40],
      projectId: DemoProject.Job,
    },

    {
      start: [15, 20],
      end: [16, 2],
      projectId: DemoProject.Job,
    },
    {
      start: [16, 5],
      end: [16, 40],
      projectId: DemoProject.Job,
    },
    {
      start: [16, 45],
      end: [17, 10],
      projectId: DemoProject.Business,
    },
  ],
  [
    {
      start: [8, 35],
      end: [9, 5],
      projectId: DemoProject.ProgrammingStudy,
    },
    {
      start: [9, 8],
      end: [9, 38],
      projectId: DemoProject.ProgrammingStudy,
    },
    {
      start: [9, 48],
      end: [10, 25],
      projectId: DemoProject.ProgrammingStudy,
    },

    {
      start: [10, 55],
      end: [11, 35],
      projectId: DemoProject.Job,
    },
    {
      start: [11, 40],
      end: [12, 10],
      projectId: DemoProject.Job,
    },
    {
      start: [12, 15],
      end: [12, 50],
      projectId: DemoProject.Job,
    },

    {
      start: [14, 20],
      end: [15, 15],
      projectId: DemoProject.Job,
    },
    {
      start: [15, 20],
      end: [15, 55],
      projectId: DemoProject.Job,
    },
    {
      start: [16, 3],
      end: [16, 40],
      projectId: DemoProject.Job,
    },
  ],
  [
    {
      start: [8, 18],
      end: [9, 10],
      projectId: DemoProject.Business,
    },
    {
      start: [9, 15],
      end: [9, 48],
      projectId: DemoProject.Business,
    },
    {
      start: [9, 50],
      end: [10, 15],
      projectId: DemoProject.Content,
    },

    {
      start: [10, 45],
      end: [11, 30],
      projectId: DemoProject.Job,
    },
    {
      start: [11, 35],
      end: [12, 10],
      projectId: DemoProject.Job,
    },
    {
      start: [12, 15],
      end: [12, 40],
      projectId: DemoProject.Job,
    },

    {
      start: [15, 20],
      end: [16, 2],
      projectId: DemoProject.Job,
    },
    {
      start: [16, 5],
      end: [16, 40],
      projectId: DemoProject.Job,
    },
    {
      start: [16, 45],
      end: [17, 10],
      projectId: DemoProject.Job,
    },
  ],
  [
    {
      start: [8, 40],
      end: [9, 6],
      projectId: DemoProject.Content,
    },
    {
      start: [9, 15],
      end: [9, 38],
      projectId: DemoProject.Content,
    },
    {
      start: [9, 48],
      end: [10, 25],
      projectId: DemoProject.Content,
    },

    {
      start: [10, 55],
      end: [11, 35],
      projectId: DemoProject.Job,
    },
    {
      start: [11, 40],
      end: [12, 10],
      projectId: DemoProject.Job,
    },
    {
      start: [12, 15],
      end: [12, 50],
      projectId: DemoProject.Job,
    },

    {
      start: [15, 20],
      end: [15, 55],
      projectId: DemoProject.ProgrammingStudy,
    },
    {
      start: [16, 3],
      end: [16, 40],
      projectId: DemoProject.ProgrammingStudy,
    },
  ],
  [
    {
      start: [8, 40],
      end: [9, 6],
      projectId: DemoProject.ProgrammingStudy,
    },
    {
      start: [9, 15],
      end: [9, 38],
      projectId: DemoProject.ProgrammingStudy,
    },
    {
      start: [9, 48],
      end: [10, 25],
      projectId: DemoProject.ProgrammingStudy,
    },

    {
      start: [11, 20],
      end: [12, 10],
      projectId: DemoProject.Content,
    },
    {
      start: [12, 15],
      end: [12, 50],
      projectId: DemoProject.Content,
    },
  ],
  [
    {
      start: [8, 30],
      end: [9, 10],
      projectId: DemoProject.Business,
    },
    {
      start: [9, 15],
      end: [9, 38],
      projectId: DemoProject.Business,
    },
    {
      start: [9, 48],
      end: [10, 30],
      projectId: DemoProject.Business,
    },

    {
      start: [11, 25],
      end: [12, 5],
      projectId: DemoProject.Business,
    },
    {
      start: [12, 10],
      end: [12, 50],
      projectId: DemoProject.Planning,
    },
    {
      start: [12, 55],
      end: [13, 20],
      projectId: DemoProject.Planning,
    },
  ],
]

export const getDemoSets = () => {
  const weekStartedAt = startOfWeek(new Date(), { weekStartsOn: 1 }).getTime()
  const today = new Date()
  const weekday = getWeekday(today)
  const now = Date.now()

  const sets = daySetsDescription
    .slice(0, weekday + 1)
    .map((sets, index) => {
      const dayStartedAt = weekStartedAt + MS_IN_DAY * index

      const getTimestamp = ([hour, minute]: SetBoundaryDescriptor) =>
        dayStartedAt + MS_IN_HOUR * hour + MS_IN_MIN * minute

      return sets.map((set) => ({
        ...set,
        start: getTimestamp(set.start),
        end: getTimestamp(set.end),
      }))
    })
    .flat()
    .filter((set) => set.end < now)

  return sets
}
