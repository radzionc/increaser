import { sendAuthLinkByEmail } from '../auth/mutations/sendAuthLinkByEmail'
import { createProject } from '../projects/mutations/createProject'
import { updateProject } from '../projects/mutations/updateProject'
import { deleteProject } from '../projects/mutations/deleteProject'
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
import { Resolvers } from './schema'
import { authSessionWithEmail } from '../auth/queries/authSessionWithEmail'
import { authSessionWithOAuth } from '../auth/queries/authSessionWithOAuth'
import { manageSubscription } from '../membership/subscription/queries/manageSubscription'

export const resolvers: Pick<Resolvers, 'Query' | 'Mutation'> = {
  Query: {
    appStats,
    userState,
    authSessionWithEmail,
    authSessionWithOAuth,
    manageSubscription,
  },
  Mutation: {
    sendAuthLinkByEmail,
    createProject,
    updateProject,
    deleteProject,
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
