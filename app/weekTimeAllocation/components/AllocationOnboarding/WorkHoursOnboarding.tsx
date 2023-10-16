import { WorkBudgetBarChart } from 'capacity/components/WorkBudgetBarChart'
import { useWorkBudgetForm } from 'capacity/components/WorkBudgetForm/useWorkBudgetForm'
import { WorkBudgetFormFields } from 'capacity/components/WorkBudgetForm/WorkBudgetFormFields'
import { useWatch } from 'react-hook-form'
import { useTheme } from 'styled-components'
import { LabeledValue } from '@increaser/ui/ui/LabeledValue'
import { Modal } from '@increaser/ui/modal'
import { VStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'
import { getWeekTimeAllocation } from 'weekTimeAllocation/helpers/getWeekTimeAllocation'
import { ContinueButton } from 'ui/ContinueButton'
import { useUpdateUserMutation } from 'user/mutations/useUpdateUserMutation'
import { convertDuration } from '@increaser/utils/time/convertDuration'
import { ClosableComponentProps } from '@increaser/ui/props'

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
