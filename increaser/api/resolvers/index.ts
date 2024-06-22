import { ApiImplementation } from './ApiImplementation'
import { authSessionWithEmail } from '../auth/resolvers/authSessionWithEmail'
import { authSessionWithOAuth } from '../auth/resolvers/authSessionWithOAuth'
import { user } from '../users/resolvers/user'
import { updateUser } from '../users/resolvers/updateUser'
import { manageSubscription } from '../membership/subscription/resolvers/manageSubscription'
import { subscription } from '../membership/subscription/resolvers/subscription'
import { scoreboard } from '../scoreboard/resolvers/scoreboard'
import { sendAuthLinkByEmail } from '../auth/resolvers/sendAuthLinkByEmail'
import { createProject } from '../projects/resolvers/createProject'
import { updateProject } from '../projects/resolvers/updateProject'
import { deleteProject } from '../projects/resolvers/deleteProject'
import { redeemAppSumoCode } from '../membership/appSumo/resolvers/redeemAppSumoCode'
import { createHabit } from '../habits/resolvers/createHabit'
import { updateHabit } from '../habits/resolvers/updateHabit'
import { deleteHabit } from '../habits/resolvers/deleteHabit'
import { createTask } from '../tasks/resolvers/createTask'
import { updateTask } from '../tasks/resolvers/updateTask'
import { deleteTask } from '../tasks/resolvers/deleteTask'
import { trackHabit } from '../habits/resolvers/trackHabit'
import { addSet } from '../sets/resolvers/addSet'
import { proposeFeature } from '../features/resolvers/proposeFeature'
import { features } from '../features/resolvers/features'
import { voteForFeature } from '../features/resolvers/voteForFeature'
import { userProfile } from '../users/resolvers/userProfile'
import { deleteSet } from '../sets/resolvers/deleteSet'
import { updateSet } from '../sets/resolvers/updateSet'
import { createVisionAttribute } from '../vision/resolvers/createVisionAttribute'
import { updateVisionAttribute } from '../vision/resolvers/updateVisionAttribute'
import { deleteVisionAttribute } from '../vision/resolvers/deleteVisionAttribute'
import { createGoal } from '../goals/resolvers/createGoal'
import { deleteGoal } from '../goals/resolvers/deleteGoal'
import { updateGoal } from '../goals/resolvers/updateGoal'
import { getFileUploadUrl } from '../users/resolvers/getFileUploadUrl'
import { createTaskFactory } from '../taskFactories/resolvers/createTaskFactory'
import { deleteTaskFactory } from '../taskFactories/resolvers/deleteTaskFactory'
import { updateTaskFactory } from '../taskFactories/resolvers/updateTaskFactory'

export const implementation: ApiImplementation = {
  authSessionWithEmail,
  authSessionWithOAuth,
  sendAuthLinkByEmail,
  user,
  updateUser,
  manageSubscription,
  subscription,
  scoreboard,
  createProject,
  updateProject,
  deleteProject,
  redeemAppSumoCode,
  createHabit,
  updateHabit,
  deleteHabit,
  trackHabit,
  addSet,
  createTask,
  updateTask,
  deleteTask,
  proposeFeature,
  features,
  voteForFeature,
  userProfile,
  deleteSet,
  updateSet,
  createVisionAttribute,
  updateVisionAttribute,
  deleteVisionAttribute,
  createGoal,
  updateGoal,
  deleteGoal,
  getFileUploadUrl,
  createTaskFactory,
  updateTaskFactory,
  deleteTaskFactory,
}
