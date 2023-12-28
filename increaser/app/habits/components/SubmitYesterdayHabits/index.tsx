import { useStartOfDay } from '@lib/ui/hooks/useStartOfDay'
import { Form } from '@lib/ui/form/components/Form'
import { Button } from '@lib/ui/buttons/Button'
import { useYesterdayHabits } from '@increaser/app/habits/hooks/useYesterdayHabits'
import { ReviewYesterdayHabits } from './ReviewYesterdayHabits'
import { useUpdateUserMutation } from '@increaser/app/user/mutations/useUpdateUserMutation'
import { useAssertUserState } from '@increaser/app/user/state/UserStateContext'
import { Panel } from '@lib/ui/panel/Panel'
import { HStack } from '@lib/ui/layout/Stack'
import styled from 'styled-components'
import { getColor } from '@lib/ui/theme/getters'

const Container = styled(Panel)`
  border: 2px dashed ${getColor('primary')};
`

export const SubmitYesterdayHabits = () => {
  const { sumbittedHabitsAt } = useAssertUserState()
  const habits = useYesterdayHabits()
  const todayStartedAt = useStartOfDay()

  const { mutate: updateUser } = useUpdateUserMutation()

  if (
    !habits.length ||
    (sumbittedHabitsAt && sumbittedHabitsAt >= todayStartedAt)
  ) {
    return null
  }

  return (
    <Container kind="secondary">
      <Form
        onSubmit={() => {
          updateUser({
            sumbittedHabitsAt: Date.now(),
          })
        }}
        content={<ReviewYesterdayHabits />}
        actions={
          <HStack fullWidth justifyContent="start">
            <Button>Submit</Button>
          </HStack>
        }
      />
    </Container>
  )
}
