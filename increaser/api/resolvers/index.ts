import { ApiImplementation } from './ApiImplementation'
import { authSessionWithEmail } from '../auth/resolvers/authSessionWithEmail'
import { authSessionWithOAuth } from '../auth/resolvers/authSessionWithOAuth'
import { user } from '../users/resolvers/user'
import { updateUser } from '../users/resolvers/updateUser'
import { manageSubscription } from '../membership/subscription/resolvers/manageSubscription'
import { subscription } from '../membership/subscription/resolvers/subscription'
import { scoreboard } from '../scoreboard/resolvers/scoreboard'
import { sendAuthLinkByEmail } from '../auth/resolvers/sendAuthLinkByEmail'
import { addSet } from '../sets/resolvers/addSet'
import { proposeFeature } from '../features/resolvers/proposeFeature'
import { features } from '../features/resolvers/features'
import { voteForFeature } from '../features/resolvers/voteForFeature'
import { userProfile } from '../users/resolvers/userProfile'
import { deleteSet } from '../sets/resolvers/deleteSet'
import { updateSet } from '../sets/resolvers/updateSet'
import { createUserEntity } from '../userEntities/resolvers/createUserEntity'
import { deleteUserEntity } from '../userEntities/resolvers/deleteUserEntity'
import { updateUserEntity } from '../userEntities/resolvers/updateUserEntity'
import { getFileUploadUrl } from '../users/resolvers/getFileUploadUrl'

export const implementation: ApiImplementation = {
  authSessionWithEmail,
  authSessionWithOAuth,
  sendAuthLinkByEmail,
  user,
  updateUser,
  manageSubscription,
  subscription,
  scoreboard,
  addSet,
  proposeFeature,
  features,
  voteForFeature,
  userProfile,
  deleteSet,
  updateSet,
  createUserEntity,
  updateUserEntity,
  deleteUserEntity,
  getFileUploadUrl,
}
