import { User, userDefaultFields } from '@increaser/entities/User'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { getCurrentTimezoneOffset } from '@lib/utils/time/getCurrentTimezoneOffset'
import { getDemoHabits } from './habits'
import { getDemoProjects } from './projects'
import { getDemoSets } from './sets'
import { getDemoTasks } from './tasks'

export const getDemoUser = (): User => {
  return {
    ...userDefaultFields,
    id: 'demo',
    email: 'john@mail.com',
    name: 'John',
    registrationDate: Date.now(),
    freeTrialEnd: Date.now() + convertDuration(100, 'd', 'ms'),
    updatedAt: Date.now(),
    timeZone: getCurrentTimezoneOffset(),
    habits: getDemoHabits(),
    projects: getDemoProjects(),
    sets: getDemoSets(),
    tasks: getDemoTasks(),
  }
}
