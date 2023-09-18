/* eslint-disable */
import * as types from './graphql'
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  '\n  mutation sendAuthLinkByEmail($input: SendAuthLinkByEmailInput!) {\n    sendAuthLinkByEmail(input: $input)\n  }\n':
    types.SendAuthLinkByEmailDocument,
  '\n  query identifyWithOAuth($input: IdentifyWithOAuthInput!) {\n    identifyWithOAuth(input: $input) {\n      email\n      name\n      token\n      tokenExpirationTime\n      id\n      firstIdentification\n    }\n  }\n':
    types.IdentifyWithOAuthDocument,
  '\n  query identifyWithEmail($input: IdentifyWithEmailInput!) {\n    identifyWithEmail(input: $input) {\n      email\n      name\n      token\n      tokenExpirationTime\n      id\n      firstIdentification\n    }\n  }\n':
    types.IdentifyWithEmailDocument,
  '\n  mutation redeemAppSumoCode($input: RedeemAppSumoCodeInput!) {\n    redeemAppSumoCode(input: $input)\n  }\n':
    types.RedeemAppSumoCodeDocument,
  '\n  mutation createHabit($input: CreateHabitInput!) {\n    createHabit(input: $input) {\n      id\n      name\n      emoji\n      color\n      startedAt\n      successes\n      order\n    }\n  }\n':
    types.CreateHabitDocument,
  '\n  mutation deleteHabit($input: DeleteHabitInput!) {\n    deleteHabit(input: $input)\n  }\n':
    types.DeleteHabitDocument,
  '\n  mutation trackHabit($input: TrackHabitInput!) {\n    trackHabit(input: $input)\n  }\n':
    types.TrackHabitDocument,
  '\n  mutation updateHabit($input: UpdateHabitInput!) {\n    updateHabit(input: $input) {\n      id\n      name\n      emoji\n      color\n      startedAt\n      successes\n      order\n    }\n  }\n':
    types.UpdateHabitDocument,
  '\n  mutation createProject($input: CreateProjectInput!) {\n    createProject(input: $input) {\n      id\n      name\n      color\n      status\n      emoji\n      total\n      allocatedMinutesPerWeek\n      weeks {\n        year\n        week\n        seconds\n      }\n      months {\n        year\n        month\n        seconds\n      }\n    }\n  }\n':
    types.CreateProjectDocument,
  '\n  mutation updateProject($input: UpdateProjectInput!) {\n    updateProject(input: $input) {\n      id\n      name\n      color\n      status\n      emoji\n      total\n      allocatedMinutesPerWeek\n      weeks {\n        year\n        week\n        seconds\n      }\n      months {\n        year\n        month\n        seconds\n      }\n    }\n  }\n':
    types.UpdateProjectDocument,
  '\n  mutation deleteProject($input: DeleteProjectInput!) {\n    deleteProject(input: $input)\n  }\n':
    types.DeleteProjectDocument,
  '\n  mutation addSet($set: SetInput!) {\n    addSet(set: $set)\n  }\n':
    types.AddSetDocument,
  '\n  mutation removeLastSet {\n    removeLastSet\n  }\n':
    types.RemoveLastSetDocument,
  '\n  mutation editLastSet($set: SetInput!) {\n    editLastSet(set: $set)\n  }\n':
    types.EditLastSetDocument,
  '\n  mutation updateUser($input: UpdateUserInput!) {\n    updateUser(input: $input)\n  }\n':
    types.UpdateUserDocument,
  '\n  query userState($input: UserStateInput!) {\n    userState(input: $input) {\n      sets {\n        start\n        end\n        projectId\n      }\n      prevSets {\n        start\n        end\n        projectId\n      }\n      projects {\n        id\n        name\n        color\n        status\n        emoji\n        total\n        allocatedMinutesPerWeek\n        weeks {\n          year\n          week\n          seconds\n        }\n        months {\n          year\n          month\n          seconds\n        }\n      }\n      habits {\n        id\n        name\n        emoji\n        color\n        startedAt\n        successes\n        order\n      }\n      tasks {\n        id\n        name\n        startedAt\n        isCompleted\n      }\n      email\n      id\n      name\n      country\n      isAnonymous\n      membership {\n        provider\n        subscription {\n          updateUrl\n          cancelUrl\n          planId\n          cancellationEffectiveDate\n          nextBillDate\n          planId\n        }\n      }\n      freeTrialEnd\n      registrationDate\n      weekTimeAllocation\n      goalToStartWorkAt\n      goalToFinishWorkBy\n      goalToGoToBedAt\n      primaryGoal\n      focusSounds {\n        name\n        url\n        favourite\n      }\n      sumbittedHabitsAt\n    }\n  }\n':
    types.UserStateDocument,
}

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation sendAuthLinkByEmail($input: SendAuthLinkByEmailInput!) {\n    sendAuthLinkByEmail(input: $input)\n  }\n',
): (typeof documents)['\n  mutation sendAuthLinkByEmail($input: SendAuthLinkByEmailInput!) {\n    sendAuthLinkByEmail(input: $input)\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query identifyWithOAuth($input: IdentifyWithOAuthInput!) {\n    identifyWithOAuth(input: $input) {\n      email\n      name\n      token\n      tokenExpirationTime\n      id\n      firstIdentification\n    }\n  }\n',
): (typeof documents)['\n  query identifyWithOAuth($input: IdentifyWithOAuthInput!) {\n    identifyWithOAuth(input: $input) {\n      email\n      name\n      token\n      tokenExpirationTime\n      id\n      firstIdentification\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query identifyWithEmail($input: IdentifyWithEmailInput!) {\n    identifyWithEmail(input: $input) {\n      email\n      name\n      token\n      tokenExpirationTime\n      id\n      firstIdentification\n    }\n  }\n',
): (typeof documents)['\n  query identifyWithEmail($input: IdentifyWithEmailInput!) {\n    identifyWithEmail(input: $input) {\n      email\n      name\n      token\n      tokenExpirationTime\n      id\n      firstIdentification\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation redeemAppSumoCode($input: RedeemAppSumoCodeInput!) {\n    redeemAppSumoCode(input: $input)\n  }\n',
): (typeof documents)['\n  mutation redeemAppSumoCode($input: RedeemAppSumoCodeInput!) {\n    redeemAppSumoCode(input: $input)\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation createHabit($input: CreateHabitInput!) {\n    createHabit(input: $input) {\n      id\n      name\n      emoji\n      color\n      startedAt\n      successes\n      order\n    }\n  }\n',
): (typeof documents)['\n  mutation createHabit($input: CreateHabitInput!) {\n    createHabit(input: $input) {\n      id\n      name\n      emoji\n      color\n      startedAt\n      successes\n      order\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation deleteHabit($input: DeleteHabitInput!) {\n    deleteHabit(input: $input)\n  }\n',
): (typeof documents)['\n  mutation deleteHabit($input: DeleteHabitInput!) {\n    deleteHabit(input: $input)\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation trackHabit($input: TrackHabitInput!) {\n    trackHabit(input: $input)\n  }\n',
): (typeof documents)['\n  mutation trackHabit($input: TrackHabitInput!) {\n    trackHabit(input: $input)\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation updateHabit($input: UpdateHabitInput!) {\n    updateHabit(input: $input) {\n      id\n      name\n      emoji\n      color\n      startedAt\n      successes\n      order\n    }\n  }\n',
): (typeof documents)['\n  mutation updateHabit($input: UpdateHabitInput!) {\n    updateHabit(input: $input) {\n      id\n      name\n      emoji\n      color\n      startedAt\n      successes\n      order\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation createProject($input: CreateProjectInput!) {\n    createProject(input: $input) {\n      id\n      name\n      color\n      status\n      emoji\n      total\n      allocatedMinutesPerWeek\n      weeks {\n        year\n        week\n        seconds\n      }\n      months {\n        year\n        month\n        seconds\n      }\n    }\n  }\n',
): (typeof documents)['\n  mutation createProject($input: CreateProjectInput!) {\n    createProject(input: $input) {\n      id\n      name\n      color\n      status\n      emoji\n      total\n      allocatedMinutesPerWeek\n      weeks {\n        year\n        week\n        seconds\n      }\n      months {\n        year\n        month\n        seconds\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation updateProject($input: UpdateProjectInput!) {\n    updateProject(input: $input) {\n      id\n      name\n      color\n      status\n      emoji\n      total\n      allocatedMinutesPerWeek\n      weeks {\n        year\n        week\n        seconds\n      }\n      months {\n        year\n        month\n        seconds\n      }\n    }\n  }\n',
): (typeof documents)['\n  mutation updateProject($input: UpdateProjectInput!) {\n    updateProject(input: $input) {\n      id\n      name\n      color\n      status\n      emoji\n      total\n      allocatedMinutesPerWeek\n      weeks {\n        year\n        week\n        seconds\n      }\n      months {\n        year\n        month\n        seconds\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation deleteProject($input: DeleteProjectInput!) {\n    deleteProject(input: $input)\n  }\n',
): (typeof documents)['\n  mutation deleteProject($input: DeleteProjectInput!) {\n    deleteProject(input: $input)\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation addSet($set: SetInput!) {\n    addSet(set: $set)\n  }\n',
): (typeof documents)['\n  mutation addSet($set: SetInput!) {\n    addSet(set: $set)\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation removeLastSet {\n    removeLastSet\n  }\n',
): (typeof documents)['\n  mutation removeLastSet {\n    removeLastSet\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation editLastSet($set: SetInput!) {\n    editLastSet(set: $set)\n  }\n',
): (typeof documents)['\n  mutation editLastSet($set: SetInput!) {\n    editLastSet(set: $set)\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation updateUser($input: UpdateUserInput!) {\n    updateUser(input: $input)\n  }\n',
): (typeof documents)['\n  mutation updateUser($input: UpdateUserInput!) {\n    updateUser(input: $input)\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query userState($input: UserStateInput!) {\n    userState(input: $input) {\n      sets {\n        start\n        end\n        projectId\n      }\n      prevSets {\n        start\n        end\n        projectId\n      }\n      projects {\n        id\n        name\n        color\n        status\n        emoji\n        total\n        allocatedMinutesPerWeek\n        weeks {\n          year\n          week\n          seconds\n        }\n        months {\n          year\n          month\n          seconds\n        }\n      }\n      habits {\n        id\n        name\n        emoji\n        color\n        startedAt\n        successes\n        order\n      }\n      tasks {\n        id\n        name\n        startedAt\n        isCompleted\n      }\n      email\n      id\n      name\n      country\n      isAnonymous\n      membership {\n        provider\n        subscription {\n          updateUrl\n          cancelUrl\n          planId\n          cancellationEffectiveDate\n          nextBillDate\n          planId\n        }\n      }\n      freeTrialEnd\n      registrationDate\n      weekTimeAllocation\n      goalToStartWorkAt\n      goalToFinishWorkBy\n      goalToGoToBedAt\n      primaryGoal\n      focusSounds {\n        name\n        url\n        favourite\n      }\n      sumbittedHabitsAt\n    }\n  }\n',
): (typeof documents)['\n  query userState($input: UserStateInput!) {\n    userState(input: $input) {\n      sets {\n        start\n        end\n        projectId\n      }\n      prevSets {\n        start\n        end\n        projectId\n      }\n      projects {\n        id\n        name\n        color\n        status\n        emoji\n        total\n        allocatedMinutesPerWeek\n        weeks {\n          year\n          week\n          seconds\n        }\n        months {\n          year\n          month\n          seconds\n        }\n      }\n      habits {\n        id\n        name\n        emoji\n        color\n        startedAt\n        successes\n        order\n      }\n      tasks {\n        id\n        name\n        startedAt\n        isCompleted\n      }\n      email\n      id\n      name\n      country\n      isAnonymous\n      membership {\n        provider\n        subscription {\n          updateUrl\n          cancelUrl\n          planId\n          cancellationEffectiveDate\n          nextBillDate\n          planId\n        }\n      }\n      freeTrialEnd\n      registrationDate\n      weekTimeAllocation\n      goalToStartWorkAt\n      goalToFinishWorkBy\n      goalToGoToBedAt\n      primaryGoal\n      focusSounds {\n        name\n        url\n        favourite\n      }\n      sumbittedHabitsAt\n    }\n  }\n']

export function graphql(source: string) {
  return (documents as any)[source] ?? {}
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never
