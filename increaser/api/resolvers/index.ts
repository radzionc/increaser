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

  // DEPRECATED
  createProject: ({ input, context }) =>
    createUserEntity({ input: { entity: 'project', value: input }, context }),
  updateProject: ({ input, context }) =>
    updateUserEntity({
      input: { entity: 'project', fields: input.fields, id: input.id },
      context,
    }),
  deleteProject: ({ input, context }) =>
    deleteUserEntity({ input: { entity: 'project', id: input.id }, context }),

  createHabit: ({ input, context }) =>
    createUserEntity({ input: { entity: 'habit', value: input }, context }),
  updateHabit: ({ input, context }) =>
    updateUserEntity({
      input: { entity: 'habit', fields: input.fields, id: input.id },
      context,
    }),
  deleteHabit: ({ input, context }) =>
    deleteUserEntity({ input: { entity: 'habit', id: input.id }, context }),

  createTask: ({ input, context }) =>
    createUserEntity({ input: { entity: 'task', value: input }, context }),
  updateTask: ({ input, context }) =>
    updateUserEntity({
      input: { entity: 'task', fields: input.fields, id: input.id },
      context,
    }),
  deleteTask: ({ input, context }) =>
    deleteUserEntity({ input: { entity: 'task', id: input.id }, context }),

  createVisionAttribute: ({ input, context }) =>
    createUserEntity({
      input: { entity: 'visionAttribute', value: input },
      context,
    }),
  updateVisionAttribute: ({ input, context }) =>
    updateUserEntity({
      input: { entity: 'visionAttribute', fields: input.fields, id: input.id },
      context,
    }),
  deleteVisionAttribute: ({ input, context }) =>
    deleteUserEntity({
      input: { entity: 'visionAttribute', id: input.id },
      context,
    }),

  createGoal: ({ input, context }) =>
    createUserEntity({ input: { entity: 'goal', value: input }, context }),
  updateGoal: ({ input, context }) =>
    updateUserEntity({
      input: { entity: 'goal', fields: input.fields, id: input.id },
      context,
    }),
  deleteGoal: ({ input, context }) =>
    deleteUserEntity({ input: { entity: 'goal', id: input.id }, context }),

  createTaskFactory: ({ input, context }) =>
    createUserEntity({
      input: { entity: 'taskFactory', value: input },
      context,
    }),
  updateTaskFactory: ({ input, context }) =>
    updateUserEntity({
      input: { entity: 'taskFactory', fields: input.fields, id: input.id },
      context,
    }),
  deleteTaskFactory: ({ input, context }) =>
    deleteUserEntity({
      input: { entity: 'taskFactory', id: input.id },
      context,
    }),

  createTaskTemplate: ({ input, context }) =>
    createUserEntity({
      input: { entity: 'taskTemplate', value: input },
      context,
    }),
  updateTaskTemplate: ({ input, context }) =>
    updateUserEntity({
      input: { entity: 'taskTemplate', fields: input.fields, id: input.id },
      context,
    }),
  deleteTaskTemplate: ({ input, context }) =>
    deleteUserEntity({
      input: { entity: 'taskTemplate', id: input.id },
      context,
    }),

  createIdea: ({ input, context }) =>
    createUserEntity({ input: { entity: 'idea', value: input }, context }),
  updateIdea: ({ input, context }) =>
    updateUserEntity({
      input: { entity: 'idea', fields: input.fields, id: input.id },
      context,
    }),
  deleteIdea: ({ input, context }) =>
    deleteUserEntity({ input: { entity: 'idea', id: input.id }, context }),
}
