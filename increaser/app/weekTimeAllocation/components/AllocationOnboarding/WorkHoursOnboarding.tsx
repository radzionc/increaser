import { WorkBudgetBarChart } from '@increaser/app/capacity/components/WorkBudgetBarChart'
import { useWorkBudgetForm } from '@increaser/app/capacity/components/WorkBudgetForm/useWorkBudgetForm'
import { WorkBudgetFormFields } from '@increaser/app/capacity/components/WorkBudgetForm/WorkBudgetFormFields'
import { useWatch } from 'react-hook-form'
import { useTheme } from 'styled-components'
import { LabeledValue } from '@lib/ui/text/LabeledValue'
import { Modal } from '@lib/ui/modal'
import { VStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import { getWeekTimeAllocation } from '@increaser/app/weekTimeAllocation/helpers/getWeekTimeAllocation'
import { ContinueButton } from '@increaser/app/ui/ContinueButton'
import { useUpdateUserMutation } from '@increaser/app/user/mutations/useUpdateUserMutation'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { ClosableComponentProps } from '@lib/ui/props'

interface Props extends ClosableComponentProps {
  onNext: () => void
}

export const WorkHoursOnboarding = ({ onNext, onClose }: Props) => {
  const form = useWorkBudgetForm()
  const { handleSubmit, control } = form

  const workdayMinutes = useWatch({
    control,
    name: 'workdayMinutes',
  })
  const weekendMinutes = useWatch({
    control,
    name: 'weekendMinutes',
  })

  const { mutate: updateUser } = useUpdateUserMutation()
  const theme = useTheme()

  const workBudgetInMin = workdayMinutes * 5 + weekendMinutes * 2

  return (
    <Modal
      title="What is your preferred number of working hours per week?"
      placement="top"
      onClose={onClose}
      footer={
        <VStack fullWidth gap={12}>
          <LabeledValue name="Work budget">
            <Text weight="bold">
              {Math.round(convertDuration(workBudgetInMin, 'min', 'h'))}h / week
            </Text>
          </LabeledValue>
          <ContinueButton
            onClick={handleSubmit(({ workdayMinutes, weekendMinutes }) => {
              const weekTimeAllocation = getWeekTimeAllocation(
                workdayMinutes,
                weekendMinutes,
              )
              updateUser({
                weekTimeAllocation,
              })
              onNext()
            })}
          />
        </VStack>
      }
    >
      <VStack gap={8}>
        <WorkBudgetFormFields
          workdayColor={theme.colors.success}
          weekendColor={theme.colors.idle}
          form={form}
        />
        <WorkBudgetBarChart
          workdayMinutes={workdayMinutes}
          weekendMinutes={weekendMinutes}
        />
      </VStack>
    </Modal>
  )
}
