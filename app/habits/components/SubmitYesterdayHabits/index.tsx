import { useStartOfDay } from '@increaser/ui/hooks/useStartOfDay'
import { Form } from '@increaser/ui/form/components/Form'
import { Button } from '@increaser/ui/buttons/Button'
import { useYesterdayHabits } from 'habits/hooks/useYesterdayHabits'
import { ReviewYesterdayHabits } from './ReviewYesterdayHabits'
import { useUpdateUserMutation } from 'user/mutations/useUpdateUserMutation'
import { useAssertUserState } from 'user/state/UserStateContext'
import { Panel } from '@increaser/ui/panel/Panel'
import { HStack } from '@increaser/ui/layout/Stack'
import styled from 'styled-components'
import { getColor } from '@increaser/ui/theme/getters'

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
