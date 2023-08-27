/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never }
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never
    }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
}

export type AppStats = {
  __typename?: 'AppStats'
  registeredUsersNumber: Scalars['Int']['output']
}

export enum AuthProvider {
  Facebook = 'facebook',
  Google = 'google',
}

export type CreateHabitInput = {
  color: Scalars['Int']['input']
  emoji: Scalars['String']['input']
  id?: InputMaybe<Scalars['String']['input']>
  name: Scalars['String']['input']
  order?: InputMaybe<Scalars['Float']['input']>
  startedAt?: InputMaybe<Scalars['Float']['input']>
}

export type CreateProjectInput = {
  allocatedMinutesPerWeek: Scalars['Float']['input']
  color: Scalars['Int']['input']
  emoji: Scalars['String']['input']
  id?: InputMaybe<Scalars['String']['input']>
  name: Scalars['String']['input']
}

export type DeleteHabitInput = {
  id: Scalars['ID']['input']
}

export type DeleteProjectInput = {
  id: Scalars['ID']['input']
}

export type FocusSound = {
  __typename?: 'FocusSound'
  favourite?: Maybe<Scalars['Boolean']['output']>
  name: Scalars['String']['output']
  url: Scalars['String']['output']
}

export type FocusSoundInput = {
  favourite?: InputMaybe<Scalars['Boolean']['input']>
  name: Scalars['String']['input']
  url: Scalars['String']['input']
}

export type Habit = {
  __typename?: 'Habit'
  color: Scalars['Int']['output']
  emoji: Scalars['String']['output']
  id: Scalars['ID']['output']
  name: Scalars['String']['output']
  order: Scalars['Float']['output']
  startedAt: Scalars['Float']['output']
  successes: Array<Scalars['String']['output']>
}

export type IdentificationResult = {
  __typename?: 'IdentificationResult'
  email: Scalars['String']['output']
  firstIdentification: Scalars['Boolean']['output']
  id: Scalars['ID']['output']
  name?: Maybe<Scalars['String']['output']>
  token: Scalars['String']['output']
  tokenExpirationTime: Scalars['Int']['output']
}

export type IdentifyWithEmailInput = {
  timeZone: Scalars['Int']['input']
  token: Scalars['String']['input']
}

export type IdentifyWithOAuthInput = {
  code: Scalars['String']['input']
  provider: AuthProvider
  redirectUri: Scalars['String']['input']
  timeZone: Scalars['Int']['input']
}

export type Membership = {
  __typename?: 'Membership'
  provider: MembershipProvider
  subscription?: Maybe<Subscription>
}

export enum MembershipProvider {
  AppSumo = 'AppSumo',
  Paddle = 'Paddle',
}

export type Mutation = {
  __typename?: 'Mutation'
  addSet?: Maybe<Scalars['Boolean']['output']>
  createHabit?: Maybe<Habit>
  createProject?: Maybe<Project>
  deleteHabit?: Maybe<Scalars['Boolean']['output']>
  deleteProject?: Maybe<Scalars['Boolean']['output']>
  editLastSet?: Maybe<Scalars['Boolean']['output']>
  redeemAppSumoCode?: Maybe<Scalars['Boolean']['output']>
  removeLastSet?: Maybe<Scalars['Boolean']['output']>
  sendAuthLinkByEmail?: Maybe<Scalars['Boolean']['output']>
  trackHabit?: Maybe<Scalars['Boolean']['output']>
  updateGoalToFinishWorkBy?: Maybe<Scalars['Int']['output']>
  updateGoalToGoToBedAt?: Maybe<Scalars['Int']['output']>
  updateGoalToStartWorkAt?: Maybe<Scalars['Int']['output']>
  updateHabit?: Maybe<Habit>
  updateProject?: Maybe<Project>
  updateUser?: Maybe<UpdateUserResult>
  updateWeekTimeAllocation?: Maybe<Array<Maybe<Scalars['Float']['output']>>>
}

export type MutationAddSetArgs = {
  set: SetInput
}

export type MutationCreateHabitArgs = {
  input: CreateHabitInput
}

export type MutationCreateProjectArgs = {
  input: CreateProjectInput
}

export type MutationDeleteHabitArgs = {
  input: DeleteHabitInput
}

export type MutationDeleteProjectArgs = {
  input: DeleteProjectInput
}

export type MutationEditLastSetArgs = {
  set: SetInput
}

export type MutationRedeemAppSumoCodeArgs = {
  input?: InputMaybe<RedeemAppSumoCodeInput>
}

export type MutationSendAuthLinkByEmailArgs = {
  input: SendAuthLinkByEmailInput
}

export type MutationTrackHabitArgs = {
  input: TrackHabitInput
}

export type MutationUpdateGoalToFinishWorkByArgs = {
  input: UpdateGoalToFinishWorkByInput
}

export type MutationUpdateGoalToGoToBedAtArgs = {
  input?: InputMaybe<UpdateGoalToGoToBedAtInput>
}

export type MutationUpdateGoalToStartWorkAtArgs = {
  input: UpdateGoalToStartWorkAtInput
}

export type MutationUpdateHabitArgs = {
  input: UpdateHabitInput
}

export type MutationUpdateProjectArgs = {
  input: UpdateProjectInput
}

export type MutationUpdateUserArgs = {
  input: UpdateUserInput
}

export type MutationUpdateWeekTimeAllocationArgs = {
  input: UpdateWeekTimeAllocationInput
}

export enum PrimaryGoal {
  Awareness = 'awareness',
  WorkLess = 'workLess',
  WorkMore = 'workMore',
}

export type Project = {
  __typename?: 'Project'
  allocatedMinutesPerWeek: Scalars['Float']['output']
  color: Scalars['Int']['output']
  emoji: Scalars['String']['output']
  id: Scalars['ID']['output']
  months: Array<ProjectMonth>
  name: Scalars['String']['output']
  status: ProjectStatus
  total: Scalars['Float']['output']
  weeks: Array<ProjectWeek>
}

export type ProjectMonth = {
  __typename?: 'ProjectMonth'
  month: Scalars['Int']['output']
  seconds: Scalars['Float']['output']
  year: Scalars['Int']['output']
}

export enum ProjectStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
}

export type ProjectWeek = {
  __typename?: 'ProjectWeek'
  seconds: Scalars['Float']['output']
  week: Scalars['Int']['output']
  year: Scalars['Int']['output']
}

export type Query = {
  __typename?: 'Query'
  appStats: AppStats
  identify: IdentificationResult
  identifyWithEmail: IdentificationResult
  identifyWithOAuth: IdentificationResult
  projects: Array<Project>
  userState: UserState
}

export type QueryIdentifyWithEmailArgs = {
  input: IdentifyWithEmailInput
}

export type QueryIdentifyWithOAuthArgs = {
  input: IdentifyWithOAuthInput
}

export type QueryUserStateArgs = {
  input: UserStateInput
}

export type RedeemAppSumoCodeInput = {
  code: Scalars['String']['input']
}

export type SendAuthLinkByEmailInput = {
  email: Scalars['String']['input']
}

export type Set = {
  __typename?: 'Set'
  end: Scalars['Float']['output']
  projectId: Scalars['ID']['output']
  start: Scalars['Float']['output']
}

export type SetInput = {
  end: Scalars['Float']['input']
  projectId?: InputMaybe<Scalars['ID']['input']>
  start: Scalars['Float']['input']
}

export type Subscription = {
  __typename?: 'Subscription'
  cancelUrl: Scalars['String']['output']
  cancellationEffectiveDate: Scalars['String']['output']
  nextBillDate: Scalars['String']['output']
  planId: Scalars['String']['output']
  updateUrl: Scalars['String']['output']
}

export type Task = {
  __typename?: 'Task'
  id: Scalars['String']['output']
  isCompleted: Scalars['Boolean']['output']
  name: Scalars['String']['output']
  startedAt: Scalars['Float']['output']
}

export type TaskInput = {
  id: Scalars['String']['input']
  isCompleted: Scalars['Boolean']['input']
  name: Scalars['String']['input']
  startedAt: Scalars['Float']['input']
}

export type TrackHabitInput = {
  date?: InputMaybe<Scalars['String']['input']>
  id: Scalars['ID']['input']
  value?: InputMaybe<Scalars['Boolean']['input']>
}

export type UpdateGoalToFinishWorkByInput = {
  goalToFinishWorkBy: Scalars['Int']['input']
}

export type UpdateGoalToGoToBedAtInput = {
  goalToGoToBedAt: Scalars['Int']['input']
}

export type UpdateGoalToStartWorkAtInput = {
  goalToStartWorkAt: Scalars['Int']['input']
}

export type UpdateHabitInput = {
  color?: InputMaybe<Scalars['Int']['input']>
  emoji?: InputMaybe<Scalars['String']['input']>
  id: Scalars['ID']['input']
  name?: InputMaybe<Scalars['String']['input']>
  order?: InputMaybe<Scalars['Float']['input']>
  startedAt?: InputMaybe<Scalars['Float']['input']>
  successes?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type UpdateProjectInput = {
  allocatedMinutesPerWeek?: InputMaybe<Scalars['Float']['input']>
  color?: InputMaybe<Scalars['Int']['input']>
  emoji?: InputMaybe<Scalars['String']['input']>
  id: Scalars['ID']['input']
  name?: InputMaybe<Scalars['String']['input']>
  status?: InputMaybe<ProjectStatus>
}

export type UpdateUserInput = {
  country?: InputMaybe<Scalars['String']['input']>
  focusSounds?: InputMaybe<Array<InputMaybe<FocusSoundInput>>>
  isAnonymous?: InputMaybe<Scalars['Boolean']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  primaryGoal?: InputMaybe<PrimaryGoal>
  tasks?: InputMaybe<Array<InputMaybe<TaskInput>>>
}

export type UpdateUserResult = {
  __typename?: 'UpdateUserResult'
  focusSounds?: Maybe<Array<Maybe<FocusSound>>>
  name?: Maybe<Scalars['String']['output']>
  primaryGoal?: Maybe<PrimaryGoal>
}

export type UpdateWeekTimeAllocationInput = {
  allocation: Array<Scalars['Float']['input']>
}

export type UserState = {
  __typename?: 'UserState'
  country: Scalars['String']['output']
  email: Scalars['String']['output']
  focusSounds: Array<FocusSound>
  freeTrialEnd: Scalars['Float']['output']
  goalToFinishWorkBy: Scalars['Int']['output']
  goalToGoToBedAt: Scalars['Int']['output']
  goalToStartWorkAt: Scalars['Int']['output']
  habits: Array<Habit>
  id: Scalars['ID']['output']
  isAnonymous: Scalars['Boolean']['output']
  membership: Membership
  name: Scalars['String']['output']
  prevSets: Array<Set>
  primaryGoal: PrimaryGoal
  projects: Array<Project>
  registrationDate: Scalars['Float']['output']
  sets: Array<Set>
  tasks: Array<Task>
  weekTimeAllocation: Array<Scalars['Float']['output']>
}

export type UserStateInput = {
  timeZone: Scalars['Int']['input']
}

export type SendAuthLinkByEmailMutationVariables = Exact<{
  input: SendAuthLinkByEmailInput
}>

export type SendAuthLinkByEmailMutation = {
  __typename?: 'Mutation'
  sendAuthLinkByEmail?: boolean | null
}

export type IdentifyWithOAuthQueryVariables = Exact<{
  input: IdentifyWithOAuthInput
}>

export type IdentifyWithOAuthQuery = {
  __typename?: 'Query'
  identifyWithOAuth: {
    __typename?: 'IdentificationResult'
    email: string
    name?: string | null
    token: string
    tokenExpirationTime: number
    id: string
    firstIdentification: boolean
  }
}

export type IdentifyWithEmailQueryVariables = Exact<{
  input: IdentifyWithEmailInput
}>

export type IdentifyWithEmailQuery = {
  __typename?: 'Query'
  identifyWithEmail: {
    __typename?: 'IdentificationResult'
    email: string
    name?: string | null
    token: string
    tokenExpirationTime: number
    id: string
    firstIdentification: boolean
  }
}

export type RedeemAppSumoCodeMutationVariables = Exact<{
  input: RedeemAppSumoCodeInput
}>

export type RedeemAppSumoCodeMutation = {
  __typename?: 'Mutation'
  redeemAppSumoCode?: boolean | null
}

export type CreateHabitMutationVariables = Exact<{
  input: CreateHabitInput
}>

export type CreateHabitMutation = {
  __typename?: 'Mutation'
  createHabit?: {
    __typename?: 'Habit'
    id: string
    name: string
    emoji: string
    color: number
    startedAt: number
    successes: Array<string>
    order: number
  } | null
}

export type DeleteHabitMutationVariables = Exact<{
  input: DeleteHabitInput
}>

export type DeleteHabitMutation = {
  __typename?: 'Mutation'
  deleteHabit?: boolean | null
}

export type TrackHabitMutationVariables = Exact<{
  input: TrackHabitInput
}>

export type TrackHabitMutation = {
  __typename?: 'Mutation'
  trackHabit?: boolean | null
}

export type UpdateHabitMutationVariables = Exact<{
  input: UpdateHabitInput
}>

export type UpdateHabitMutation = {
  __typename?: 'Mutation'
  updateHabit?: {
    __typename?: 'Habit'
    id: string
    name: string
    emoji: string
    color: number
    startedAt: number
    successes: Array<string>
    order: number
  } | null
}

export type CreateProjectMutationVariables = Exact<{
  input: CreateProjectInput
}>

export type CreateProjectMutation = {
  __typename?: 'Mutation'
  createProject?: {
    __typename?: 'Project'
    id: string
    name: string
    color: number
    status: ProjectStatus
    emoji: string
    total: number
    allocatedMinutesPerWeek: number
    weeks: Array<{
      __typename?: 'ProjectWeek'
      year: number
      week: number
      seconds: number
    }>
    months: Array<{
      __typename?: 'ProjectMonth'
      year: number
      month: number
      seconds: number
    }>
  } | null
}

export type UpdateProjectMutationVariables = Exact<{
  input: UpdateProjectInput
}>

export type UpdateProjectMutation = {
  __typename?: 'Mutation'
  updateProject?: {
    __typename?: 'Project'
    id: string
    name: string
    color: number
    status: ProjectStatus
    emoji: string
    total: number
    allocatedMinutesPerWeek: number
    weeks: Array<{
      __typename?: 'ProjectWeek'
      year: number
      week: number
      seconds: number
    }>
    months: Array<{
      __typename?: 'ProjectMonth'
      year: number
      month: number
      seconds: number
    }>
  } | null
}

export type DeleteProjectMutationVariables = Exact<{
  input: DeleteProjectInput
}>

export type DeleteProjectMutation = {
  __typename?: 'Mutation'
  deleteProject?: boolean | null
}

export type AddSetMutationVariables = Exact<{
  set: SetInput
}>

export type AddSetMutation = {
  __typename?: 'Mutation'
  addSet?: boolean | null
}

export type RemoveLastSetMutationVariables = Exact<{ [key: string]: never }>

export type RemoveLastSetMutation = {
  __typename?: 'Mutation'
  removeLastSet?: boolean | null
}

export type UpdateGoalToFinishWorkByMutationVariables = Exact<{
  input: UpdateGoalToFinishWorkByInput
}>

export type UpdateGoalToFinishWorkByMutation = {
  __typename?: 'Mutation'
  updateGoalToFinishWorkBy?: number | null
}

export type UpdateGoalToGoToBedAtMutationVariables = Exact<{
  input: UpdateGoalToGoToBedAtInput
}>

export type UpdateGoalToGoToBedAtMutation = {
  __typename?: 'Mutation'
  updateGoalToGoToBedAt?: number | null
}

export type UpdateGoalToStartWorkAtMutationVariables = Exact<{
  input: UpdateGoalToStartWorkAtInput
}>

export type UpdateGoalToStartWorkAtMutation = {
  __typename?: 'Mutation'
  updateGoalToStartWorkAt?: number | null
}

export type EditLastSetMutationVariables = Exact<{
  set: SetInput
}>

export type EditLastSetMutation = {
  __typename?: 'Mutation'
  editLastSet?: boolean | null
}

export type UpdateUserMutationVariables = Exact<{
  input: UpdateUserInput
}>

export type UpdateUserMutation = {
  __typename?: 'Mutation'
  updateUser?: { __typename?: 'UpdateUserResult'; name?: string | null } | null
}

export type UserStateQueryVariables = Exact<{
  input: UserStateInput
}>

export type UserStateQuery = {
  __typename?: 'Query'
  userState: {
    __typename?: 'UserState'
    email: string
    id: string
    name: string
    country: string
    isAnonymous: boolean
    freeTrialEnd: number
    registrationDate: number
    weekTimeAllocation: Array<number>
    goalToStartWorkAt: number
    goalToFinishWorkBy: number
    goalToGoToBedAt: number
    primaryGoal: PrimaryGoal
    sets: Array<{
      __typename?: 'Set'
      start: number
      end: number
      projectId: string
    }>
    prevSets: Array<{
      __typename?: 'Set'
      start: number
      end: number
      projectId: string
    }>
    projects: Array<{
      __typename?: 'Project'
      id: string
      name: string
      color: number
      status: ProjectStatus
      emoji: string
      total: number
      allocatedMinutesPerWeek: number
      weeks: Array<{
        __typename?: 'ProjectWeek'
        year: number
        week: number
        seconds: number
      }>
      months: Array<{
        __typename?: 'ProjectMonth'
        year: number
        month: number
        seconds: number
      }>
    }>
    habits: Array<{
      __typename?: 'Habit'
      id: string
      name: string
      emoji: string
      color: number
      startedAt: number
      successes: Array<string>
      order: number
    }>
    tasks: Array<{
      __typename?: 'Task'
      id: string
      name: string
      startedAt: number
      isCompleted: boolean
    }>
    membership: {
      __typename?: 'Membership'
      provider: MembershipProvider
      subscription?: {
        __typename?: 'Subscription'
        updateUrl: string
        cancelUrl: string
        planId: string
        cancellationEffectiveDate: string
        nextBillDate: string
      } | null
    }
    focusSounds: Array<{
      __typename?: 'FocusSound'
      name: string
      url: string
      favourite?: boolean | null
    }>
  }
}

export type UpdateWeekTimeAllocationMutationVariables = Exact<{
  input: UpdateWeekTimeAllocationInput
}>

export type UpdateWeekTimeAllocationMutation = {
  __typename?: 'Mutation'
  updateWeekTimeAllocation?: Array<number | null> | null
}

export const SendAuthLinkByEmailDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'sendAuthLinkByEmail' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'SendAuthLinkByEmailInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'sendAuthLinkByEmail' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  SendAuthLinkByEmailMutation,
  SendAuthLinkByEmailMutationVariables
>
export const IdentifyWithOAuthDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'identifyWithOAuth' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'IdentifyWithOAuthInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'identifyWithOAuth' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'token' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'tokenExpirationTime' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'firstIdentification' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  IdentifyWithOAuthQuery,
  IdentifyWithOAuthQueryVariables
>
export const IdentifyWithEmailDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'identifyWithEmail' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'IdentifyWithEmailInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'identifyWithEmail' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'token' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'tokenExpirationTime' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'firstIdentification' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  IdentifyWithEmailQuery,
  IdentifyWithEmailQueryVariables
>
export const RedeemAppSumoCodeDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'redeemAppSumoCode' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'RedeemAppSumoCodeInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'redeemAppSumoCode' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  RedeemAppSumoCodeMutation,
  RedeemAppSumoCodeMutationVariables
>
export const CreateHabitDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'createHabit' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CreateHabitInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createHabit' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'emoji' } },
                { kind: 'Field', name: { kind: 'Name', value: 'color' } },
                { kind: 'Field', name: { kind: 'Name', value: 'startedAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'successes' } },
                { kind: 'Field', name: { kind: 'Name', value: 'order' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateHabitMutation, CreateHabitMutationVariables>
export const DeleteHabitDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'deleteHabit' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'DeleteHabitInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'deleteHabit' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeleteHabitMutation, DeleteHabitMutationVariables>
export const TrackHabitDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'trackHabit' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'TrackHabitInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'trackHabit' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<TrackHabitMutation, TrackHabitMutationVariables>
export const UpdateHabitDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'updateHabit' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'UpdateHabitInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateHabit' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'emoji' } },
                { kind: 'Field', name: { kind: 'Name', value: 'color' } },
                { kind: 'Field', name: { kind: 'Name', value: 'startedAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'successes' } },
                { kind: 'Field', name: { kind: 'Name', value: 'order' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateHabitMutation, UpdateHabitMutationVariables>
export const CreateProjectDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'createProject' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CreateProjectInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createProject' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'color' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'emoji' } },
                { kind: 'Field', name: { kind: 'Name', value: 'total' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'allocatedMinutesPerWeek' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'weeks' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'year' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'week' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'seconds' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'months' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'year' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'month' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'seconds' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateProjectMutation,
  CreateProjectMutationVariables
>
export const UpdateProjectDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'updateProject' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'UpdateProjectInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateProject' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'color' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'emoji' } },
                { kind: 'Field', name: { kind: 'Name', value: 'total' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'allocatedMinutesPerWeek' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'weeks' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'year' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'week' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'seconds' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'months' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'year' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'month' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'seconds' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateProjectMutation,
  UpdateProjectMutationVariables
>
export const DeleteProjectDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'deleteProject' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'DeleteProjectInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'deleteProject' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DeleteProjectMutation,
  DeleteProjectMutationVariables
>
export const AddSetDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'addSet' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'set' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'SetInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'addSet' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'set' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'set' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AddSetMutation, AddSetMutationVariables>
export const RemoveLastSetDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'removeLastSet' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'removeLastSet' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  RemoveLastSetMutation,
  RemoveLastSetMutationVariables
>
export const UpdateGoalToFinishWorkByDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'updateGoalToFinishWorkBy' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'UpdateGoalToFinishWorkByInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateGoalToFinishWorkBy' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateGoalToFinishWorkByMutation,
  UpdateGoalToFinishWorkByMutationVariables
>
export const UpdateGoalToGoToBedAtDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'updateGoalToGoToBedAt' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'UpdateGoalToGoToBedAtInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateGoalToGoToBedAt' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateGoalToGoToBedAtMutation,
  UpdateGoalToGoToBedAtMutationVariables
>
export const UpdateGoalToStartWorkAtDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'updateGoalToStartWorkAt' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'UpdateGoalToStartWorkAtInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateGoalToStartWorkAt' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateGoalToStartWorkAtMutation,
  UpdateGoalToStartWorkAtMutationVariables
>
export const EditLastSetDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'editLastSet' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'set' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'SetInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'editLastSet' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'set' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'set' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<EditLastSetMutation, EditLastSetMutationVariables>
export const UpdateUserDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'updateUser' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'UpdateUserInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateUser' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateUserMutation, UpdateUserMutationVariables>
export const UserStateDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'userState' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'UserStateInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'userState' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'sets' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'start' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'end' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'projectId' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'prevSets' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'start' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'end' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'projectId' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'projects' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'color' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'status' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'emoji' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'total' } },
                      {
                        kind: 'Field',
                        name: {
                          kind: 'Name',
                          value: 'allocatedMinutesPerWeek',
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'weeks' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'year' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'week' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'seconds' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'months' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'year' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'month' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'seconds' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'habits' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'emoji' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'color' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'startedAt' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'successes' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'order' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'tasks' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'startedAt' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'isCompleted' },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'country' } },
                { kind: 'Field', name: { kind: 'Name', value: 'isAnonymous' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'membership' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'provider' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'subscription' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'updateUrl' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'cancelUrl' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'planId' },
                            },
                            {
                              kind: 'Field',
                              name: {
                                kind: 'Name',
                                value: 'cancellationEffectiveDate',
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'nextBillDate' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'planId' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'freeTrialEnd' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'registrationDate' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'weekTimeAllocation' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'goalToStartWorkAt' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'goalToFinishWorkBy' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'goalToGoToBedAt' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'primaryGoal' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'focusSounds' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'url' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'favourite' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UserStateQuery, UserStateQueryVariables>
export const UpdateWeekTimeAllocationDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'updateWeekTimeAllocation' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'UpdateWeekTimeAllocationInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateWeekTimeAllocation' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateWeekTimeAllocationMutation,
  UpdateWeekTimeAllocationMutationVariables
>
