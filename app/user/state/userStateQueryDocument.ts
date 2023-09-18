import { graphql } from '@increaser/api-interface/client'

export const userStateQueryDocument = graphql(`
  query userState($input: UserStateInput!) {
    userState(input: $input) {
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
      membership {
        provider
        subscription {
          updateUrl
          cancelUrl
          planId
          cancellationEffectiveDate
          nextBillDate
          planId
        }
      }
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
