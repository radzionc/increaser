import { GraphQLResolveInfo } from 'graphql'
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
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>
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
  registeredUsersNumber?: Maybe<Scalars['Int']['output']>
}

export type AskForRefundInput = {
  description?: InputMaybe<Scalars['String']['input']>
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
  color?: Maybe<Scalars['Int']['output']>
  emoji?: Maybe<Scalars['String']['output']>
  id?: Maybe<Scalars['ID']['output']>
  name?: Maybe<Scalars['String']['output']>
  order?: Maybe<Scalars['Float']['output']>
  startedAt?: Maybe<Scalars['Float']['output']>
  successes?: Maybe<Array<Maybe<Scalars['String']['output']>>>
}

export type IdentificationResult = {
  __typename?: 'IdentificationResult'
  email?: Maybe<Scalars['String']['output']>
  firstIdentification?: Maybe<Scalars['Boolean']['output']>
  id?: Maybe<Scalars['ID']['output']>
  name?: Maybe<Scalars['String']['output']>
  token?: Maybe<Scalars['String']['output']>
  tokenExpirationTime?: Maybe<Scalars['Int']['output']>
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
  askForRefund?: Maybe<Scalars['Boolean']['output']>
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

export type MutationAskForRefundArgs = {
  askForRefundInput: AskForRefundInput
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

export type Project = {
  __typename?: 'Project'
  allocatedMinutesPerWeek?: Maybe<Scalars['Float']['output']>
  color?: Maybe<Scalars['Int']['output']>
  emoji?: Maybe<Scalars['String']['output']>
  id?: Maybe<Scalars['ID']['output']>
  months?: Maybe<Array<Maybe<ProjectMonth>>>
  name?: Maybe<Scalars['String']['output']>
  status?: Maybe<ProjectStatus>
  total?: Maybe<Scalars['Float']['output']>
  weeks?: Maybe<Array<Maybe<ProjectWeek>>>
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
  appStats?: Maybe<AppStats>
  identify?: Maybe<IdentificationResult>
  identifyWithEmail?: Maybe<IdentificationResult>
  identifyWithOAuth?: Maybe<IdentificationResult>
  projects?: Maybe<Array<Maybe<Project>>>
  userState?: Maybe<UserState>
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
  code?: InputMaybe<Scalars['String']['input']>
}

export type SendAuthLinkByEmailInput = {
  email: Scalars['String']['input']
}

export type Set = {
  __typename?: 'Set'
  end?: Maybe<Scalars['Float']['output']>
  projectId?: Maybe<Scalars['ID']['output']>
  start?: Maybe<Scalars['Float']['output']>
}

export type SetInput = {
  end: Scalars['Float']['input']
  projectId?: InputMaybe<Scalars['ID']['input']>
  start: Scalars['Float']['input']
}

export type Subscription = {
  __typename?: 'Subscription'
  cancelUrl?: Maybe<Scalars['String']['output']>
  cancellationEffectiveDate?: Maybe<Scalars['String']['output']>
  nextBillDate?: Maybe<Scalars['String']['output']>
  planId?: Maybe<Scalars['String']['output']>
  updateUrl?: Maybe<Scalars['String']['output']>
}

export type Task = {
  __typename?: 'Task'
  id?: Maybe<Scalars['String']['output']>
  isCompleted?: Maybe<Scalars['Boolean']['output']>
  name?: Maybe<Scalars['String']['output']>
  startedAt?: Maybe<Scalars['Float']['output']>
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
  goalToFinishWorkBy?: InputMaybe<Scalars['Int']['input']>
}

export type UpdateGoalToGoToBedAtInput = {
  goalToGoToBedAt?: InputMaybe<Scalars['Int']['input']>
}

export type UpdateGoalToStartWorkAtInput = {
  goalToStartWorkAt?: InputMaybe<Scalars['Int']['input']>
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
  primaryGoal?: InputMaybe<Scalars['String']['input']>
  tasks?: InputMaybe<Array<InputMaybe<TaskInput>>>
}

export type UpdateUserResult = {
  __typename?: 'UpdateUserResult'
  focusSounds?: Maybe<Array<Maybe<FocusSound>>>
  name?: Maybe<Scalars['String']['output']>
  primaryGoal?: Maybe<Scalars['String']['output']>
}

export type UpdateWeekTimeAllocationInput = {
  allocation?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>
}

export type UserState = {
  __typename?: 'UserState'
  country?: Maybe<Scalars['String']['output']>
  email?: Maybe<Scalars['String']['output']>
  focusSounds?: Maybe<Array<Maybe<FocusSound>>>
  freeTrialEnd?: Maybe<Scalars['Float']['output']>
  goalToFinishWorkBy?: Maybe<Scalars['Int']['output']>
  goalToGoToBedAt?: Maybe<Scalars['Int']['output']>
  goalToStartWorkAt?: Maybe<Scalars['Int']['output']>
  habits?: Maybe<Array<Maybe<Habit>>>
  id?: Maybe<Scalars['ID']['output']>
  isAnonymous?: Maybe<Scalars['Boolean']['output']>
  membership?: Maybe<Membership>
  name?: Maybe<Scalars['String']['output']>
  prevSets?: Maybe<Array<Maybe<Set>>>
  primaryGoal?: Maybe<Scalars['String']['output']>
  projects?: Maybe<Array<Maybe<Project>>>
  registrationDate?: Maybe<Scalars['Float']['output']>
  sets?: Maybe<Array<Maybe<Set>>>
  tasks?: Maybe<Array<Maybe<Task>>>
  weekTimeAllocation?: Maybe<Array<Maybe<Scalars['Float']['output']>>>
}

export type UserStateInput = {
  timeZone?: InputMaybe<Scalars['Int']['input']>
}

export type ResolverTypeWrapper<T> = Promise<T> | T

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {},
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {},
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AppStats: ResolverTypeWrapper<AppStats>
  AskForRefundInput: AskForRefundInput
  AuthProvider: AuthProvider
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>
  CreateHabitInput: CreateHabitInput
  CreateProjectInput: CreateProjectInput
  DeleteHabitInput: DeleteHabitInput
  DeleteProjectInput: DeleteProjectInput
  Float: ResolverTypeWrapper<Scalars['Float']['output']>
  FocusSound: ResolverTypeWrapper<FocusSound>
  FocusSoundInput: FocusSoundInput
  Habit: ResolverTypeWrapper<Habit>
  ID: ResolverTypeWrapper<Scalars['ID']['output']>
  IdentificationResult: ResolverTypeWrapper<IdentificationResult>
  IdentifyWithEmailInput: IdentifyWithEmailInput
  IdentifyWithOAuthInput: IdentifyWithOAuthInput
  Int: ResolverTypeWrapper<Scalars['Int']['output']>
  Membership: ResolverTypeWrapper<Membership>
  MembershipProvider: MembershipProvider
  Mutation: ResolverTypeWrapper<{}>
  Project: ResolverTypeWrapper<Project>
  ProjectMonth: ResolverTypeWrapper<ProjectMonth>
  ProjectStatus: ProjectStatus
  ProjectWeek: ResolverTypeWrapper<ProjectWeek>
  Query: ResolverTypeWrapper<{}>
  RedeemAppSumoCodeInput: RedeemAppSumoCodeInput
  SendAuthLinkByEmailInput: SendAuthLinkByEmailInput
  Set: ResolverTypeWrapper<Set>
  SetInput: SetInput
  String: ResolverTypeWrapper<Scalars['String']['output']>
  Subscription: ResolverTypeWrapper<{}>
  Task: ResolverTypeWrapper<Task>
  TaskInput: TaskInput
  TrackHabitInput: TrackHabitInput
  UpdateGoalToFinishWorkByInput: UpdateGoalToFinishWorkByInput
  UpdateGoalToGoToBedAtInput: UpdateGoalToGoToBedAtInput
  UpdateGoalToStartWorkAtInput: UpdateGoalToStartWorkAtInput
  UpdateHabitInput: UpdateHabitInput
  UpdateProjectInput: UpdateProjectInput
  UpdateUserInput: UpdateUserInput
  UpdateUserResult: ResolverTypeWrapper<UpdateUserResult>
  UpdateWeekTimeAllocationInput: UpdateWeekTimeAllocationInput
  UserState: ResolverTypeWrapper<UserState>
  UserStateInput: UserStateInput
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AppStats: AppStats
  AskForRefundInput: AskForRefundInput
  Boolean: Scalars['Boolean']['output']
  CreateHabitInput: CreateHabitInput
  CreateProjectInput: CreateProjectInput
  DeleteHabitInput: DeleteHabitInput
  DeleteProjectInput: DeleteProjectInput
  Float: Scalars['Float']['output']
  FocusSound: FocusSound
  FocusSoundInput: FocusSoundInput
  Habit: Habit
  ID: Scalars['ID']['output']
  IdentificationResult: IdentificationResult
  IdentifyWithEmailInput: IdentifyWithEmailInput
  IdentifyWithOAuthInput: IdentifyWithOAuthInput
  Int: Scalars['Int']['output']
  Membership: Membership
  Mutation: {}
  Project: Project
  ProjectMonth: ProjectMonth
  ProjectWeek: ProjectWeek
  Query: {}
  RedeemAppSumoCodeInput: RedeemAppSumoCodeInput
  SendAuthLinkByEmailInput: SendAuthLinkByEmailInput
  Set: Set
  SetInput: SetInput
  String: Scalars['String']['output']
  Subscription: {}
  Task: Task
  TaskInput: TaskInput
  TrackHabitInput: TrackHabitInput
  UpdateGoalToFinishWorkByInput: UpdateGoalToFinishWorkByInput
  UpdateGoalToGoToBedAtInput: UpdateGoalToGoToBedAtInput
  UpdateGoalToStartWorkAtInput: UpdateGoalToStartWorkAtInput
  UpdateHabitInput: UpdateHabitInput
  UpdateProjectInput: UpdateProjectInput
  UpdateUserInput: UpdateUserInput
  UpdateUserResult: UpdateUserResult
  UpdateWeekTimeAllocationInput: UpdateWeekTimeAllocationInput
  UserState: UserState
  UserStateInput: UserStateInput
}

export type AppStatsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['AppStats'] = ResolversParentTypes['AppStats'],
> = {
  registeredUsersNumber?: Resolver<
    Maybe<ResolversTypes['Int']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type FocusSoundResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['FocusSound'] = ResolversParentTypes['FocusSound'],
> = {
  favourite?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType
  >
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type HabitResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Habit'] = ResolversParentTypes['Habit'],
> = {
  color?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  emoji?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  order?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  startedAt?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  successes?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['String']>>>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type IdentificationResultResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['IdentificationResult'] = ResolversParentTypes['IdentificationResult'],
> = {
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  firstIdentification?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType
  >
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  tokenExpirationTime?: Resolver<
    Maybe<ResolversTypes['Int']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type MembershipResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Membership'] = ResolversParentTypes['Membership'],
> = {
  provider?: Resolver<
    ResolversTypes['MembershipProvider'],
    ParentType,
    ContextType
  >
  subscription?: Resolver<
    Maybe<ResolversTypes['Subscription']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type MutationResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation'],
> = {
  addSet?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType,
    RequireFields<MutationAddSetArgs, 'set'>
  >
  askForRefund?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType,
    RequireFields<MutationAskForRefundArgs, 'askForRefundInput'>
  >
  createHabit?: Resolver<
    Maybe<ResolversTypes['Habit']>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateHabitArgs, 'input'>
  >
  createProject?: Resolver<
    Maybe<ResolversTypes['Project']>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateProjectArgs, 'input'>
  >
  deleteHabit?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteHabitArgs, 'input'>
  >
  deleteProject?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteProjectArgs, 'input'>
  >
  editLastSet?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType,
    RequireFields<MutationEditLastSetArgs, 'set'>
  >
  redeemAppSumoCode?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType,
    Partial<MutationRedeemAppSumoCodeArgs>
  >
  removeLastSet?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType
  >
  sendAuthLinkByEmail?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType,
    RequireFields<MutationSendAuthLinkByEmailArgs, 'input'>
  >
  trackHabit?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType,
    RequireFields<MutationTrackHabitArgs, 'input'>
  >
  updateGoalToFinishWorkBy?: Resolver<
    Maybe<ResolversTypes['Int']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateGoalToFinishWorkByArgs, 'input'>
  >
  updateGoalToGoToBedAt?: Resolver<
    Maybe<ResolversTypes['Int']>,
    ParentType,
    ContextType,
    Partial<MutationUpdateGoalToGoToBedAtArgs>
  >
  updateGoalToStartWorkAt?: Resolver<
    Maybe<ResolversTypes['Int']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateGoalToStartWorkAtArgs, 'input'>
  >
  updateHabit?: Resolver<
    Maybe<ResolversTypes['Habit']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateHabitArgs, 'input'>
  >
  updateProject?: Resolver<
    Maybe<ResolversTypes['Project']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateProjectArgs, 'input'>
  >
  updateUser?: Resolver<
    Maybe<ResolversTypes['UpdateUserResult']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateUserArgs, 'input'>
  >
  updateWeekTimeAllocation?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Float']>>>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateWeekTimeAllocationArgs, 'input'>
  >
}

export type ProjectResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Project'] = ResolversParentTypes['Project'],
> = {
  allocatedMinutesPerWeek?: Resolver<
    Maybe<ResolversTypes['Float']>,
    ParentType,
    ContextType
  >
  color?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  emoji?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>
  months?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['ProjectMonth']>>>,
    ParentType,
    ContextType
  >
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  status?: Resolver<
    Maybe<ResolversTypes['ProjectStatus']>,
    ParentType,
    ContextType
  >
  total?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  weeks?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['ProjectWeek']>>>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type ProjectMonthResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['ProjectMonth'] = ResolversParentTypes['ProjectMonth'],
> = {
  month?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  seconds?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
  year?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type ProjectWeekResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['ProjectWeek'] = ResolversParentTypes['ProjectWeek'],
> = {
  seconds?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
  week?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  year?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type QueryResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Query'] = ResolversParentTypes['Query'],
> = {
  appStats?: Resolver<
    Maybe<ResolversTypes['AppStats']>,
    ParentType,
    ContextType
  >
  identify?: Resolver<
    Maybe<ResolversTypes['IdentificationResult']>,
    ParentType,
    ContextType
  >
  identifyWithEmail?: Resolver<
    Maybe<ResolversTypes['IdentificationResult']>,
    ParentType,
    ContextType,
    RequireFields<QueryIdentifyWithEmailArgs, 'input'>
  >
  identifyWithOAuth?: Resolver<
    Maybe<ResolversTypes['IdentificationResult']>,
    ParentType,
    ContextType,
    RequireFields<QueryIdentifyWithOAuthArgs, 'input'>
  >
  projects?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Project']>>>,
    ParentType,
    ContextType
  >
  userState?: Resolver<
    Maybe<ResolversTypes['UserState']>,
    ParentType,
    ContextType,
    RequireFields<QueryUserStateArgs, 'input'>
  >
}

export type SetResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Set'] = ResolversParentTypes['Set'],
> = {
  end?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  projectId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>
  start?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type SubscriptionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription'],
> = {
  cancelUrl?: SubscriptionResolver<
    Maybe<ResolversTypes['String']>,
    'cancelUrl',
    ParentType,
    ContextType
  >
  cancellationEffectiveDate?: SubscriptionResolver<
    Maybe<ResolversTypes['String']>,
    'cancellationEffectiveDate',
    ParentType,
    ContextType
  >
  nextBillDate?: SubscriptionResolver<
    Maybe<ResolversTypes['String']>,
    'nextBillDate',
    ParentType,
    ContextType
  >
  planId?: SubscriptionResolver<
    Maybe<ResolversTypes['String']>,
    'planId',
    ParentType,
    ContextType
  >
  updateUrl?: SubscriptionResolver<
    Maybe<ResolversTypes['String']>,
    'updateUrl',
    ParentType,
    ContextType
  >
}

export type TaskResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Task'] = ResolversParentTypes['Task'],
> = {
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  isCompleted?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType
  >
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  startedAt?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type UpdateUserResultResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['UpdateUserResult'] = ResolversParentTypes['UpdateUserResult'],
> = {
  focusSounds?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['FocusSound']>>>,
    ParentType,
    ContextType
  >
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  primaryGoal?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type UserStateResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['UserState'] = ResolversParentTypes['UserState'],
> = {
  country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  focusSounds?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['FocusSound']>>>,
    ParentType,
    ContextType
  >
  freeTrialEnd?: Resolver<
    Maybe<ResolversTypes['Float']>,
    ParentType,
    ContextType
  >
  goalToFinishWorkBy?: Resolver<
    Maybe<ResolversTypes['Int']>,
    ParentType,
    ContextType
  >
  goalToGoToBedAt?: Resolver<
    Maybe<ResolversTypes['Int']>,
    ParentType,
    ContextType
  >
  goalToStartWorkAt?: Resolver<
    Maybe<ResolversTypes['Int']>,
    ParentType,
    ContextType
  >
  habits?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Habit']>>>,
    ParentType,
    ContextType
  >
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>
  isAnonymous?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType
  >
  membership?: Resolver<
    Maybe<ResolversTypes['Membership']>,
    ParentType,
    ContextType
  >
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  prevSets?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Set']>>>,
    ParentType,
    ContextType
  >
  primaryGoal?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  projects?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Project']>>>,
    ParentType,
    ContextType
  >
  registrationDate?: Resolver<
    Maybe<ResolversTypes['Float']>,
    ParentType,
    ContextType
  >
  sets?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Set']>>>,
    ParentType,
    ContextType
  >
  tasks?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Task']>>>,
    ParentType,
    ContextType
  >
  weekTimeAllocation?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Float']>>>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type Resolvers<ContextType = any> = {
  AppStats?: AppStatsResolvers<ContextType>
  FocusSound?: FocusSoundResolvers<ContextType>
  Habit?: HabitResolvers<ContextType>
  IdentificationResult?: IdentificationResultResolvers<ContextType>
  Membership?: MembershipResolvers<ContextType>
  Mutation?: MutationResolvers<ContextType>
  Project?: ProjectResolvers<ContextType>
  ProjectMonth?: ProjectMonthResolvers<ContextType>
  ProjectWeek?: ProjectWeekResolvers<ContextType>
  Query?: QueryResolvers<ContextType>
  Set?: SetResolvers<ContextType>
  Subscription?: SubscriptionResolvers<ContextType>
  Task?: TaskResolvers<ContextType>
  UpdateUserResult?: UpdateUserResultResolvers<ContextType>
  UserState?: UserStateResolvers<ContextType>
}
