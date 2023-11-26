import { useWatch } from 'react-hook-form'
import { TitledSection } from '@increaser/ui/Layout/TitledSection'
import { Panel } from '@increaser/ui/panel/Panel'
import { HStack, VStack } from '@increaser/ui/layout/Stack'
import { Text } from '@increaser/ui/text'

import { useWorkBudgetForm } from './WorkBudgetForm/useWorkBudgetForm'
import { WorkBudgetForm } from './WorkBudgetForm/WorkBudgetForm'
import { WorkBudgetVisualization } from './WorkBudgetVisualization'
import { convertDuration } from '@increaser/utils/time/convertDuration'

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
                  {Math.round(
                    convertDuration(
                      workdayMinutes * 5 + weekendMinutes * 2,
                      'min',
                      'h',
                    ),
                  )}
                  h / week
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
