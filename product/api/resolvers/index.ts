import { authSessionWithEmail } from '../auth/resolvers/authSessionWithEmail'
import { authSessionWithOAuth } from '../auth/resolvers/authSessionWithOAuth'
import { sendAuthLinkByEmail } from '../auth/resolvers/sendAuthLinkByEmail'
import { features } from '../features/resolvers/features'
import { proposeFeature } from '../features/resolvers/proposeFeature'
import { voteForFeature } from '../features/resolvers/voteForFeature'
import { scoreboard } from '../scoreboard/resolvers/scoreboard'
import { addSet } from '../sets/resolvers/addSet'
import { addSets } from '../sets/resolvers/addSets'
import { deleteSet } from '../sets/resolvers/deleteSet'
import { updateSet } from '../sets/resolvers/updateSet'
import { createUserEntity } from '../userEntities/resolvers/createUserEntity'
import { deleteUserEntity } from '../userEntities/resolvers/deleteUserEntity'
import { updateUserEntities } from '../userEntities/resolvers/updateUserEntities'
import { updateUserEntity } from '../userEntities/resolvers/updateUserEntity'
import { getFileUploadUrl } from '../users/resolvers/getFileUploadUrl'
import { updateUser } from '../users/resolvers/updateUser'
import { user } from '../users/resolvers/user'
import { userProfile } from '../users/resolvers/userProfile'

import { ApiImplementation } from './ApiImplementation'

export const implementation: ApiImplementation = {
  authSessionWithEmail,
  authSessionWithOAuth,
  sendAuthLinkByEmail,
  user,
  updateUser,
  scoreboard,
  addSet,
  proposeFeature,
  features,
  voteForFeature,
  userProfile,
  addSets,
  deleteSet,
  updateSet,
  createUserEntity,
  updateUserEntity,
  updateUserEntities,
  deleteUserEntity,
  getFileUploadUrl,
}
