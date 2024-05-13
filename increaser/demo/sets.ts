import { DemoProject } from './projects'
import { getWeekday } from '@lib/utils/time/getWeekday'
import { MS_IN_HOUR, MS_IN_MIN } from '@lib/utils/time'
import { startOfMonth, subMonths, startOfDay } from 'date-fns'
import { range } from '@lib/utils/array/range'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { isWorkday } from '@lib/utils/time/workweek'
import { Set } from '@increaser/entities/User'
import { randomlyPick } from '@lib/utils/array/randomlyPick'

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
      projectId: DemoProject.Business,
    },
    {
      start: [16, 2],
      end: [16, 40],
      projectId: DemoProject.Business,
    },
  ],
  [
    {
      start: [8, 20],
      end: [9, 10],
      projectId: DemoProject.Planning,
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
      projectId: DemoProject.Business,
    },
    {
      start: [16, 5],
      end: [16, 40],
      projectId: DemoProject.Business,
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
      projectId: DemoProject.Content,
    },
    {
      start: [9, 8],
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
      projectId: DemoProject.Job,
    },
  ],
  [
    {
      start: [8, 40],
      end: [9, 6],
      projectId: DemoProject.Planning,
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
      start: [8, 40],
      end: [9, 6],
      projectId: DemoProject.Planning,
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
      start: [11, 20],
      end: [12, 10],
      projectId: DemoProject.Content,
    },
    {
      start: [12, 15],
      end: [12, 50],
      projectId: DemoProject.Content,
    },

    {
      start: [15, 20],
      end: [16, 10],
      projectId: DemoProject.Content,
    },
    {
      start: [16, 18],
      end: [16, 40],
      projectId: DemoProject.Content,
    },
  ],
  [
    {
      start: [8, 30],
      end: [9, 10],
      projectId: DemoProject.Planning,
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
      projectId: DemoProject.Business,
    },
    {
      start: [12, 55],
      end: [13, 20],
      projectId: DemoProject.Business,
    },
  ],
]

const getRandomSets = (timestamp: number) => {
  const options = isWorkday(timestamp)
    ? daySetsDescription.slice(0, 5)
    : daySetsDescription.slice(-2)

  return randomlyPick(options)
}

export const getDemoSets = () => {
  const today = new Date()
  const now = Date.now()

  const firstDayStartedAt = startOfMonth(subMonths(now, 6)).getTime()
  const todayStartedAt = startOfDay(now).getTime()
  const daysNumber =
    Math.round(convertDuration(todayStartedAt - firstDayStartedAt, 'ms', 'd')) +
    1
  const currentWeekday = getWeekday(today)
  const currentWeekStartedAt =
    todayStartedAt - convertDuration(currentWeekday, 'd', 'ms')

  const result: Set[] = []
  range(daysNumber).forEach((index) => {
    const dayStartedAt = firstDayStartedAt + convertDuration(index, 'd', 'ms')

    const getTimestamp = ([hour, minute]: SetBoundaryDescriptor) =>
      dayStartedAt + MS_IN_HOUR * hour + MS_IN_MIN * minute

    const isCurrentWeek = dayStartedAt >= currentWeekStartedAt
    const sets = isCurrentWeek
      ? daySetsDescription[
          Math.round(
            convertDuration(dayStartedAt - currentWeekStartedAt, 'ms', 'd'),
          )
        ]
      : getRandomSets(dayStartedAt)

    sets.forEach((set) => {
      const start = getTimestamp(set.start)
      const end = getTimestamp(set.end)
      if (end < now) {
        result.push({
          start,
          end,
          projectId: set.projectId,
        })
      }
    })
  })

  return result
}
