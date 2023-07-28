import { useWatch } from 'react-hook-form'
import { formatDuration } from 'shared/utils/formatDuration'
import { TitledSection } from '@increaser/ui/ui/Layout/TitledSection'
import { Panel } from '@increaser/ui/ui/Panel/Panel'
import { HStack, VStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'

import { useWorkBudgetForm } from './WorkBudgetForm/useWorkBudgetForm'
import { WorkBudgetForm } from './WorkBudgetForm/WorkBudgetForm'
import { WorkBudgetVisualization } from './WorkBudgetVisualization'

export const ManageCapacity = () => {
  const form = useWorkBudgetForm()
  const { control } = form

  const workdayMinutes = useWatch({
    control,
    name: 'workdayMinutes',
  })
  const weekendMinutes = useWatch({
    control,
    name: 'weekendMinutes',
  })

  return (
    <Panel kind="secondary">
      <TitledSection
        title={
          <HStack fullWidth justifyContent="space-between" alignItems="start">
            <VStack gap={4}>
              <HStack gap={8}>
                <Text>Work budget:</Text>
                <Text color="regular" as="span">
                  {formatDuration(
                    workdayMinutes * 5 + weekendMinutes * 2,
                    'min',
                  )}{' '}
                  / week
                </Text>
              </HStack>
            </VStack>
          </HStack>
        }
      >
        <WorkBudgetVisualization />
        <WorkBudgetForm form={form} />
      </TitledSection>
    </Panel>
  )
}
