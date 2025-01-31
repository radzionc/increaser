import { useUpdateUserMutation } from '@increaser/ui/user/mutations/useUpdateUserMutation'
import { useEffect } from 'react'
import { TrackHabits } from '@increaser/ui/habits/TrackHabits'
import { useHabits } from '@increaser/ui/habits/hooks/useHabits'
import { isEmpty } from '@lib/utils/array/isEmpty'
import { EmptyState } from '@lib/ui/data/empty/EmptyState'
import { AddHabit } from '@increaser/ui/habits/AddHabit'
import { LearnMoreShyAction } from '@lib/ui/info/LearnMoreShyAction'
import Link from 'next/link'
import { getAppPath } from '@increaser/ui/navigation/app'
import styled from 'styled-components'
import { shyTextButton } from '@lib/ui/buttons/ShyTextButton'

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
