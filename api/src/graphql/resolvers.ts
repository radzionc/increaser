import { identifyWithOAuth } from '../auth/queries/identifyWithOAuth'
import { identifyWithEmail } from '../auth/queries/identifyWithEmail'
import { identify } from '../auth/queries/identify'
import { sendAuthLinkByEmail } from '../auth/mutations/sendAuthLinkByEmail'
import { createProject } from '../projects/mutations/createProject'
import { updateProject } from '../projects/mutations/updateProject'
import { deleteProject } from '../projects/mutations/deleteProject'
import { updateGoalToStartWorkAt } from '../sets/mutations/updateGoalToStartWorkAt'
import { updateGoalToFinishWorkBy } from '../sets/mutations/updateGoalToFinishWorkBy'
import { updateGoalToGoToBedAt } from '../sets/mutations/updateGoalToGoToBedAt'
import { updateWeekTimeAllocation } from '../weekTimeAllocation/mutations/updateWeekTimeAllocation'
import { userState } from '../users/queries/userState'
import { updateUser } from '../users/mutation/updateUser'
import { redeemAppSumoCode } from '../membership/appSumo/mutations/redeemAppSumoCode'
import { createHabit } from '../habits/mutations/createHabit'
import { deleteHabit } from '../habits/mutations/deleteHabit'
import { updateHabit } from '../habits/mutations/updateHabit'
import { trackHabit } from '../habits/mutations/trackHabit'
import { appStats } from '../product/queries/appStats'
import { addSet } from '../sets/mutations/addSet'
import { editLastSet } from '../sets/mutations/editLastSet'
import { removeLastSet } from '../sets/mutations/removeLastSet'

export const resolvers = {
  Query: {
    appStats,
    identifyWithOAuth,
    identify,
    identifyWithEmail,
    userState,
  },
  Mutation: {
    sendAuthLinkByEmail,
    createProject,
    updateProject,
    deleteProject,
    updateWeekTimeAllocation,
    updateGoalToStartWorkAt,
    updateGoalToFinishWorkBy,
    updateGoalToGoToBedAt,
    redeemAppSumoCode,
    createHabit,
    deleteHabit,
    updateHabit,
    trackHabit,
    addSet,
    editLastSet,
    removeLastSet,
    updateUser,
  },
}
