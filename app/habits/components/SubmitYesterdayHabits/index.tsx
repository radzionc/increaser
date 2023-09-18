import { useStartOfDay } from '@increaser/ui/hooks/useStartOfDay'
import { Form } from '@increaser/ui/ui/Form/Form'
import { Button } from '@increaser/ui/ui/buttons/Button'
import { useYesterdayHabits } from 'habits/hooks/useYesterdayHabits'
import { ReviewYesterdayHabits } from './ReviewYesterdayHabits'
import { useUpdateUserMutation } from 'user/mutations/useUpdateUserMutation'
import { useAssertUserState } from 'user/state/UserStateContext'

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
    <Form
      onSubmit={() => {
        updateUser({
          sumbittedHabitsAt: Date.now(),
        })
      }}
      content={<ReviewYesterdayHabits />}
      actions={
        <Button size="l" kind="reversed">
          Submit
        </Button>
      }
    />
  )
}
