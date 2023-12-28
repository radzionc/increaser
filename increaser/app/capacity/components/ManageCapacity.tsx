import { useWatch } from 'react-hook-form'
import { TitledSection } from '@lib/ui/Layout/TitledSection'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'

import { useWorkBudgetForm } from './WorkBudgetForm/useWorkBudgetForm'
import { WorkBudgetForm } from './WorkBudgetForm/WorkBudgetForm'
import { WorkBudgetVisualization } from './WorkBudgetVisualization'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { CollapseToggleButton } from '@lib/ui/buttons/CollapseToggleButton'
import { useBoolean } from '@lib/ui/hooks/useBoolean'

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

  const [isExpanded, { toggle }] = useBoolean(false)

  return (
    <>
      <TitledSection
        title={
          <HStack fullWidth justifyContent="space-between" alignItems="center">
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
            <CollapseToggleButton onClick={toggle} isOpen={isExpanded} />
          </HStack>
        }
      >
        <WorkBudgetVisualization />
        {isExpanded && <WorkBudgetForm form={form} />}
      </TitledSection>
    </>
  )
}
