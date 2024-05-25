import { Form } from '@lib/ui/form/components/Form'
import { Button } from '@lib/ui/buttons/Button'
import { ReviewYesterdayHabits } from './ReviewYesterdayHabits'
import { useUpdateUserMutation } from '@increaser/ui/user/mutations/useUpdateUserMutation'
import { HStack } from '@lib/ui/layout/Stack'

export const SubmitYesterdayHabits = () => {
  const { mutate: updateUser } = useUpdateUserMutation()

  return (
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
  )
}
