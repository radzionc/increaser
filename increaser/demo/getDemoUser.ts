import { User, userDefaultFields } from '@increaser/entities/User'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { getCurrentTimezoneOffset } from '@lib/utils/time/getCurrentTimezoneOffset'
import { getDemoHabits } from './habits'
import { getDemoProjects } from './projects'
import { getDemoSets } from './sets'
import { getDemoTasks } from './tasks'
import { demoConfig } from './config'
import { organizeMonths } from '@increaser/data-services/sets/organizeMonths'
import { organizeWeeks } from '@increaser/data-services/sets/organizeWeeks'
import { getDemoVision } from './vision'
import { getDemoGoals } from './goals'
import { dayToString, toDay } from '@lib/utils/time/Day'
import { demoTaskFactories } from './taskFactories'
import { getDemoIdeas } from './ideas'
import { demoTaskTemplates } from './taskTemplates'

export const getDemoUser = (): User => {
  const now = Date.now()

  const dobTimestamp = now - convertDuration(52 * 26 + 8, 'w', 'ms')
  const dob = dayToString(toDay(dobTimestamp))

  const user = {
    ...userDefaultFields,
    id: demoConfig.userId,
    email: demoConfig.userEmail,
    dob,
    name: 'John',
    registrationDate: now,
    finishedOnboardingAt: now,
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
