import { graphql } from '@increaser/api-interface/client'

export const userStateQueryDocument = graphql(`
  query userState($input: UserStateInput!) {
    userState(input: $input) {
      subscription {
        id
        provider
        planId
        status
        nextBilledAt
        endsAt
      }
      lifeTimeDeal {
        provider
      }
      sets {
        start
        end
        projectId
      }
      prevSets {
        start
        end
        projectId
      }
      projects {
        id
        name
        color
        status
        emoji
        total
        allocatedMinutesPerWeek
        weeks {
          year
          week
          seconds
        }
        months {
          year
          month
          seconds
        }
      }
      habits {
        id
        name
        emoji
        color
        startedAt
        successes
        order
      }
      tasks {
        id
        name
        startedAt
        isCompleted
      }
      email
      id
      name
      country
      isAnonymous
      freeTrialEnd
      registrationDate
      weekTimeAllocation
      goalToStartWorkAt
      goalToFinishWorkBy
      goalToGoToBedAt
      primaryGoal
      focusSounds {
        name
        url
        favourite
      }
      sumbittedHabitsAt
    }
  }
`)
