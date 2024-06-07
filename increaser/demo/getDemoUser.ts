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
import { otherProject } from '@increaser/entities/Project'
import { getDemoVision } from './vision'
import { getDemoGoals } from './goals'

export const getDemoUser = (): User => {
  const user = {
    ...userDefaultFields,
    id: demoConfig.userId,
    email: demoConfig.userEmail,
    name: 'John',
    registrationDate: Date.now(),
    finishedOnboardingAt: Date.now(),
    freeTrialEnd: Date.now() + convertDuration(100, 'd', 'ms'),
    lastVisitAt: Date.now(),
    timeZone: getCurrentTimezoneOffset(),
    habits: getDemoHabits(),
    projects: [otherProject, ...getDemoProjects()],
    sets: getDemoSets(),
    tasks: getDemoTasks(),
    vision: getDemoVision(),
    goals: getDemoGoals(),
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
