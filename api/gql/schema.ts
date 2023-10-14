import { GraphQLResolveInfo } from 'graphql'
export type Maybe<T> = T | undefined
export type InputMaybe<T> = T | undefined
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
  registeredUsersNumber: Scalars['Int']['output']
}

export type AuthSession = {
  __typename?: 'AuthSession'
  expiresAt: Scalars['Int']['output']
  isFirst?: Maybe<Scalars['Boolean']['output']>
  token: Scalars['String']['output']
}

export type AuthSessionWithEmailInput = {
  code: Scalars['String']['input']
  timeZone: Scalars['Int']['input']
}

export type AuthSessionWithOAuthInput = {
  code: Scalars['String']['input']
  provider: OAuthProvider
  redirectUri: Scalars['String']['input']
  timeZone: Scalars['Int']['input']
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

export type LifeTimeDeal = {
  __typename?: 'LifeTimeDeal'
  provider?: Maybe<LifeTimeDealProvider>
}

export const LifeTimeDealProvider = {
  Appsumo: 'appsumo',
} as const

export type LifeTimeDealProvider =
  (typeof LifeTimeDealProvider)[keyof typeof LifeTimeDealProvider]
export type ManageSubscription = {
  __typename?: 'ManageSubscription'
  cancelUrl: Scalars['String']['output']
  updateUrl: Scalars['String']['output']
}

export type Membership = {
  __typename?: 'Membership'
  provider: MembershipProvider
  subscription?: Maybe<MembershipSubscription>
}

export const MembershipProvider = {
  AppSumo: 'AppSumo',
  Paddle: 'Paddle',
} as const

export type MembershipProvider =
  (typeof MembershipProvider)[keyof typeof MembershipProvider]
export type MembershipSubscription = {
  __typename?: 'MembershipSubscription'
  cancelUrl: Scalars['String']['output']
  cancellationEffectiveDate?: Maybe<Scalars['String']['output']>
  nextBillDate?: Maybe<Scalars['String']['output']>
  planId: Scalars['String']['output']
  updateUrl: Scalars['String']['output']
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
  updateHabit?: Maybe<Habit>
  updateProject?: Maybe<Project>
  updateUser?: Maybe<Scalars['Boolean']['output']>
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
  input: RedeemAppSumoCodeInput
}

export type MutationSendAuthLinkByEmailArgs = {
  input: SendAuthLinkByEmailInput
}

export type MutationTrackHabitArgs = {
  input: TrackHabitInput
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

export const OAuthProvider = {
  Facebook: 'facebook',
  Google: 'google',
} as const

export type OAuthProvider = (typeof OAuthProvider)[keyof typeof OAuthProvider]
export const PrimaryGoal = {
  Awareness: 'awareness',
  WorkLess: 'workLess',
  WorkMore: 'workMore',
} as const

export type PrimaryGoal = (typeof PrimaryGoal)[keyof typeof PrimaryGoal]
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

export const ProjectStatus = {
  Active: 'ACTIVE',
  Inactive: 'INACTIVE',
} as const

export type ProjectStatus = (typeof ProjectStatus)[keyof typeof ProjectStatus]
export type ProjectWeek = {
  __typename?: 'ProjectWeek'
  seconds: Scalars['Float']['output']
  week: Scalars['Int']['output']
  year: Scalars['Int']['output']
}

export type Query = {
  __typename?: 'Query'
  appStats: AppStats
  authSessionWithEmail: AuthSession
  authSessionWithOAuth: AuthSession
  manageSubscription: ManageSubscription
  projects: Array<Project>
  userState: UserState
}

export type QueryAuthSessionWithEmailArgs = {
  input: AuthSessionWithEmailInput
}

export type QueryAuthSessionWithOAuthArgs = {
  input: AuthSessionWithOAuthInput
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
  projectId: Scalars['ID']['input']
  start: Scalars['Float']['input']
}

export type Subscription = {
  __typename?: 'Subscription'
  endsAt?: Maybe<Scalars['Float']['output']>
  id: Scalars['String']['output']
  nextBilledAt?: Maybe<Scalars['Float']['output']>
  planId: Scalars['String']['output']
  provider: SubscriptionProvider
  status: SubscriptionStatus
}

export const SubscriptionBillingCycle = {
  Month: 'month',
  Year: 'year',
} as const

export type SubscriptionBillingCycle =
  (typeof SubscriptionBillingCycle)[keyof typeof SubscriptionBillingCycle]
export const SubscriptionProvider = {
  PaddleClassic: 'paddleClassic',
} as const

export type SubscriptionProvider =
  (typeof SubscriptionProvider)[keyof typeof SubscriptionProvider]
export const SubscriptionStatus = {
  Active: 'active',
  Canceled: 'canceled',
  PastDue: 'pastDue',
} as const

export type SubscriptionStatus =
  (typeof SubscriptionStatus)[keyof typeof SubscriptionStatus]
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
  date: Scalars['String']['input']
  id: Scalars['ID']['input']
  value: Scalars['Boolean']['input']
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
  focusSounds?: InputMaybe<Array<FocusSoundInput>>
  goalToFinishWorkBy?: InputMaybe<Scalars['Int']['input']>
  goalToGoToBedAt?: InputMaybe<Scalars['Int']['input']>
  goalToStartWorkAt?: InputMaybe<Scalars['Int']['input']>
  isAnonymous?: InputMaybe<Scalars['Boolean']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  primaryGoal?: InputMaybe<PrimaryGoal>
  sumbittedHabitsAt?: InputMaybe<Scalars['Float']['input']>
  tasks?: InputMaybe<Array<TaskInput>>
  weekTimeAllocation?: InputMaybe<Array<Scalars['Float']['input']>>
}

export type UserState = {
  __typename?: 'UserState'
  country?: Maybe<Scalars['String']['output']>
  email: Scalars['String']['output']
  focusSounds: Array<FocusSound>
  freeTrialEnd: Scalars['Float']['output']
  goalToFinishWorkBy: Scalars['Int']['output']
  goalToGoToBedAt: Scalars['Int']['output']
  goalToStartWorkAt: Scalars['Int']['output']
  habits: Array<Habit>
  id: Scalars['ID']['output']
  isAnonymous: Scalars['Boolean']['output']
  lifeTimeDeal?: Maybe<LifeTimeDeal>
  membership?: Maybe<Membership>
  name?: Maybe<Scalars['String']['output']>
  prevSets: Array<Set>
  primaryGoal: PrimaryGoal
  projects: Array<Project>
  registrationDate: Scalars['Float']['output']
  sets: Array<Set>
  subscription?: Maybe<Subscription>
  sumbittedHabitsAt?: Maybe<Scalars['Float']['output']>
  tasks: Array<Task>
  weekTimeAllocation: Array<Scalars['Float']['output']>
}

export type UserStateInput = {
  timeZone: Scalars['Int']['input']
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
  AuthSession: ResolverTypeWrapper<AuthSession>
  AuthSessionWithEmailInput: AuthSessionWithEmailInput
  AuthSessionWithOAuthInput: AuthSessionWithOAuthInput
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
  Int: ResolverTypeWrapper<Scalars['Int']['output']>
  LifeTimeDeal: ResolverTypeWrapper<LifeTimeDeal>
  LifeTimeDealProvider: LifeTimeDealProvider
  ManageSubscription: ResolverTypeWrapper<ManageSubscription>
  Membership: ResolverTypeWrapper<Membership>
  MembershipProvider: MembershipProvider
  MembershipSubscription: ResolverTypeWrapper<MembershipSubscription>
  Mutation: ResolverTypeWrapper<{}>
  OAuthProvider: OAuthProvider
  PrimaryGoal: PrimaryGoal
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
  SubscriptionBillingCycle: SubscriptionBillingCycle
  SubscriptionProvider: SubscriptionProvider
  SubscriptionStatus: SubscriptionStatus
  Task: ResolverTypeWrapper<Task>
  TaskInput: TaskInput
  TrackHabitInput: TrackHabitInput
  UpdateHabitInput: UpdateHabitInput
  UpdateProjectInput: UpdateProjectInput
  UpdateUserInput: UpdateUserInput
  UserState: ResolverTypeWrapper<UserState>
  UserStateInput: UserStateInput
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AppStats: AppStats
  AuthSession: AuthSession
  AuthSessionWithEmailInput: AuthSessionWithEmailInput
  AuthSessionWithOAuthInput: AuthSessionWithOAuthInput
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
  Int: Scalars['Int']['output']
  LifeTimeDeal: LifeTimeDeal
  ManageSubscription: ManageSubscription
  Membership: Membership
  MembershipSubscription: MembershipSubscription
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
  UpdateHabitInput: UpdateHabitInput
  UpdateProjectInput: UpdateProjectInput
  UpdateUserInput: UpdateUserInput
  UserState: UserState
  UserStateInput: UserStateInput
}

export type AppStatsResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['AppStats'] = ResolversParentTypes['AppStats'],
> = {
  registeredUsersNumber?: Resolver<
    ResolversTypes['Int'],
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type AuthSessionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['AuthSession'] = ResolversParentTypes['AuthSession'],
> = {
  expiresAt?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  isFirst?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>
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
  color?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  emoji?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  order?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
  startedAt?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
  successes?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type LifeTimeDealResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['LifeTimeDeal'] = ResolversParentTypes['LifeTimeDeal'],
> = {
  provider?: Resolver<
    Maybe<ResolversTypes['LifeTimeDealProvider']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type ManageSubscriptionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['ManageSubscription'] = ResolversParentTypes['ManageSubscription'],
> = {
  cancelUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  updateUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>
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
    Maybe<ResolversTypes['MembershipSubscription']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type MembershipSubscriptionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['MembershipSubscription'] = ResolversParentTypes['MembershipSubscription'],
> = {
  cancelUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  cancellationEffectiveDate?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  nextBillDate?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  planId?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  updateUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>
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
    RequireFields<MutationRedeemAppSumoCodeArgs, 'input'>
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
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateUserArgs, 'input'>
  >
}

export type ProjectResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Project'] = ResolversParentTypes['Project'],
> = {
  allocatedMinutesPerWeek?: Resolver<
    ResolversTypes['Float'],
    ParentType,
    ContextType
  >
  color?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  emoji?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  months?: Resolver<
    Array<ResolversTypes['ProjectMonth']>,
    ParentType,
    ContextType
  >
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  status?: Resolver<ResolversTypes['ProjectStatus'], ParentType, ContextType>
  total?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
  weeks?: Resolver<
    Array<ResolversTypes['ProjectWeek']>,
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
  appStats?: Resolver<ResolversTypes['AppStats'], ParentType, ContextType>
  authSessionWithEmail?: Resolver<
    ResolversTypes['AuthSession'],
    ParentType,
    ContextType,
    RequireFields<QueryAuthSessionWithEmailArgs, 'input'>
  >
  authSessionWithOAuth?: Resolver<
    ResolversTypes['AuthSession'],
    ParentType,
    ContextType,
    RequireFields<QueryAuthSessionWithOAuthArgs, 'input'>
  >
  manageSubscription?: Resolver<
    ResolversTypes['ManageSubscription'],
    ParentType,
    ContextType
  >
  projects?: Resolver<Array<ResolversTypes['Project']>, ParentType, ContextType>
  userState?: Resolver<
    ResolversTypes['UserState'],
    ParentType,
    ContextType,
    RequireFields<QueryUserStateArgs, 'input'>
  >
}

export type SetResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Set'] = ResolversParentTypes['Set'],
> = {
  end?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
  projectId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  start?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type SubscriptionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription'],
> = {
  endsAt?: SubscriptionResolver<
    Maybe<ResolversTypes['Float']>,
    'endsAt',
    ParentType,
    ContextType
  >
  id?: SubscriptionResolver<
    ResolversTypes['String'],
    'id',
    ParentType,
    ContextType
  >
  nextBilledAt?: SubscriptionResolver<
    Maybe<ResolversTypes['Float']>,
    'nextBilledAt',
    ParentType,
    ContextType
  >
  planId?: SubscriptionResolver<
    ResolversTypes['String'],
    'planId',
    ParentType,
    ContextType
  >
  provider?: SubscriptionResolver<
    ResolversTypes['SubscriptionProvider'],
    'provider',
    ParentType,
    ContextType
  >
  status?: SubscriptionResolver<
    ResolversTypes['SubscriptionStatus'],
    'status',
    ParentType,
    ContextType
  >
}

export type TaskResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Task'] = ResolversParentTypes['Task'],
> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  isCompleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  startedAt?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type UserStateResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['UserState'] = ResolversParentTypes['UserState'],
> = {
  country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  focusSounds?: Resolver<
    Array<ResolversTypes['FocusSound']>,
    ParentType,
    ContextType
  >
  freeTrialEnd?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
  goalToFinishWorkBy?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  goalToGoToBedAt?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  goalToStartWorkAt?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  habits?: Resolver<Array<ResolversTypes['Habit']>, ParentType, ContextType>
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  isAnonymous?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  lifeTimeDeal?: Resolver<
    Maybe<ResolversTypes['LifeTimeDeal']>,
    ParentType,
    ContextType
  >
  membership?: Resolver<
    Maybe<ResolversTypes['Membership']>,
    ParentType,
    ContextType
  >
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  prevSets?: Resolver<Array<ResolversTypes['Set']>, ParentType, ContextType>
  primaryGoal?: Resolver<ResolversTypes['PrimaryGoal'], ParentType, ContextType>
  projects?: Resolver<Array<ResolversTypes['Project']>, ParentType, ContextType>
  registrationDate?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
  sets?: Resolver<Array<ResolversTypes['Set']>, ParentType, ContextType>
  subscription?: Resolver<
    Maybe<ResolversTypes['Subscription']>,
    ParentType,
    ContextType
  >
  sumbittedHabitsAt?: Resolver<
    Maybe<ResolversTypes['Float']>,
    ParentType,
    ContextType
  >
  tasks?: Resolver<Array<ResolversTypes['Task']>, ParentType, ContextType>
  weekTimeAllocation?: Resolver<
    Array<ResolversTypes['Float']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type Resolvers<ContextType = any> = {
  AppStats?: AppStatsResolvers<ContextType>
  AuthSession?: AuthSessionResolvers<ContextType>
  FocusSound?: FocusSoundResolvers<ContextType>
  Habit?: HabitResolvers<ContextType>
  LifeTimeDeal?: LifeTimeDealResolvers<ContextType>
  ManageSubscription?: ManageSubscriptionResolvers<ContextType>
  Membership?: MembershipResolvers<ContextType>
  MembershipSubscription?: MembershipSubscriptionResolvers<ContextType>
  Mutation?: MutationResolvers<ContextType>
  Project?: ProjectResolvers<ContextType>
  ProjectMonth?: ProjectMonthResolvers<ContextType>
  ProjectWeek?: ProjectWeekResolvers<ContextType>
  Query?: QueryResolvers<ContextType>
  Set?: SetResolvers<ContextType>
  Subscription?: SubscriptionResolvers<ContextType>
  Task?: TaskResolvers<ContextType>
  UserState?: UserStateResolvers<ContextType>
}
