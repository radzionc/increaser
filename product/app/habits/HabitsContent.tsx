import { shyTextButton } from '@lib/ui/buttons/ShyTextButton'
import { EmptyState } from '@lib/ui/data/empty/EmptyState'
import { isEmpty } from '@lib/utils/array/isEmpty'
import { AddHabit } from '@product/ui/habits/AddHabit'
import { useHabits } from '@product/ui/habits/hooks/useHabits'
import { TrackHabits } from '@product/ui/habits/TrackHabits'
import { LearnMoreShyAction } from '@product/ui/info/LearnMoreShyAction'
import { getAppPath } from '@product/ui/navigation/app'
import { useUpdateUserMutation } from '@product/ui/user/mutations/useUpdateUserMutation'
import Link from 'next/link'
import { useEffect } from 'react'
import styled from 'styled-components'

const HabitsIdeasLink = styled(Link)`
  ${shyTextButton}
`

export const HabitsContent = () => {
  const { mutate } = useUpdateUserMutation()
  useEffect(() => {
    mutate({
      viewedHabitsAt: Date.now(),
    })
  }, [mutate])

  const habits = useHabits()

  if (isEmpty(habits)) {
    return (
      <EmptyState
        title="Start with your first habit"
        action={
          <>
            <LearnMoreShyAction value="habits" />
            <AddHabit />
          </>
        }
        description={
          <>
            Build lasting habits that align with your goals. Not sure where to
            start?{' '}
            <HabitsIdeasLink href={getAppPath('habits', 'ideas')}>
              Check out our curated list of habits
            </HabitsIdeasLink>{' '}
            for inspiration in health, relationships, and work.
          </>
        }
      />
    )
  }

  return <TrackHabits />
}
