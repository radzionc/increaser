import { convertDuration } from '@lib/utils/time/convertDuration'
import { dayToString, toDay } from '@lib/utils/time/Day'
import { getCurrentTimezoneOffset } from '@lib/utils/time/getCurrentTimezoneOffset'
import { organizeMonths } from '@product/data-services/sets/organizeMonths'
import { organizeWeeks } from '@product/data-services/sets/organizeWeeks'
import { User, userDefaultFields } from '@product/entities/User'
import { subYears, subMonths } from 'date-fns'

import { demoConfig } from './config'
import { getDemoGoals } from './goals'
import { getDemoHabits } from './habits'
import { getDemoIdeas } from './ideas'
import { getDemoProjects } from './projects'
import { getDemoSets } from './sets'
import { demoTaskFactories } from './taskFactories'
import { getDemoTasks } from './tasks'
import { demoTaskTemplates } from './taskTemplates'
import { getDemoVision } from './vision'

export const getDemoUser = (): User => {
  const now = Date.now()

  const dobTimestamp = subMonths(subYears(now, 26), 8).getTime()
  const dob = dayToString(toDay(dobTimestamp))

  const user = {
    ...userDefaultFields,
    id: demoConfig.userId,
    email: demoConfig.userEmail,
    dob,
    name: 'John',
    registrationDate: now,
    freeTrialEnd: now + convertDuration(100, 'd', 'ms'),
    lastVisitAt: now,
    timeZone: getCurrentTimezoneOffset(),
    habits: getDemoHabits(),
    projects: getDemoProjects(),
    sets: getDemoSets(),
    tasks: getDemoTasks(),
    vision: getDemoVision(),
    goals: getDemoGoals(),
    ideas: getDemoIdeas(),
    notes: getDemoIdeas(),
    taskFactories: demoTaskFactories,
    taskTemplates: demoTaskTemplates,
  }

  const fields: Partial<User> = [organizeWeeks, organizeMonths].reduce(
    (acc, organize) => ({ ...acc, ...organize({ ...user, ...acc }) }),
    {},
  )

  return {
    ...user,
    ...fields,
  }
}
