import { Form } from '@lib/ui/form/components/Form'
import { Button } from '@lib/ui/buttons/Button'
import { ReviewYesterdayHabits } from './ReviewYesterdayHabits'
import { useUpdateUserMutation } from '@increaser/ui/user/mutations/useUpdateUserMutation'
import { Panel } from '@lib/ui/panel/Panel'
import { HStack } from '@lib/ui/layout/Stack'

export const SubmitYesterdayHabits = () => {
  const { mutate: updateUser } = useUpdateUserMutation()

  return (
    <Panel kind="secondary">
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
    </Panel>
  )
}
