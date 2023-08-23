import { WorkBudgetBarChart } from 'capacity/components/WorkBudgetBarChart'
import { useWorkBudgetForm } from 'capacity/components/WorkBudgetForm/useWorkBudgetForm'
import { WorkBudgetFormFields } from 'capacity/components/WorkBudgetForm/WorkBudgetFormFields'
import { useWatch } from 'react-hook-form'
import { formatDuration } from '@increaser/utils/formatDuration'
import { useTheme } from 'styled-components'
import { LabeledValue } from '@increaser/ui/ui/LabeledValue'
import { Modal } from '@increaser/ui/ui/Modal'
import { VStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'
import { getWeekTimeAllocation } from 'weekTimeAllocation/helpers/getWeekTimeAllocation'
import { useUpdateWeekTimeAllocation } from 'weekTimeAllocation/hooks/useUpdateWeekTimeAllocation'
import { ContinueButton } from 'ui/ContinueButton'

interface Props {
  onNext: () => void
}

export const WorkHoursOnboarding = ({ onNext }: Props) => {
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

  const { mutate: updateAllocation } = useUpdateWeekTimeAllocation()
  const theme = useTheme()

  return (
    <Modal
      title="What is your preferred number of working hours per week?"
      hasImplicitClose={false}
      placement="top"
      renderContent={() => (
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
      )}
      footer={
        <VStack fullWidth gap={12}>
          <LabeledValue name="Work budget">
            <Text weight="bold">
              {formatDuration(workdayMinutes * 5 + weekendMinutes * 2, 'min')} /
              week
            </Text>
          </LabeledValue>
          <ContinueButton
            onClick={handleSubmit(({ workdayMinutes, weekendMinutes }) => {
              const allocation = getWeekTimeAllocation(
                workdayMinutes,
                weekendMinutes,
              )
              updateAllocation(allocation)
              onNext()
            })}
          />
        </VStack>
      }
    />
  )
}
