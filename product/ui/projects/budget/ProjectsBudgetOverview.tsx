import { HStack, VStack } from '@lib/ui/css/stack'
import { Text } from '@lib/ui/text'
import { LabeledValue } from '@lib/ui/text/LabeledValue'
import { formatDuration } from '@lib/utils/time/formatDuration'
import { ProjectsBudgetVisualization } from '@product/ui/projects/budget/ProjectsBudgetVisualization'
import { useWorkBudgetTotal } from '@product/ui/workBudget/hooks/useWorkBudgetTotal'
import Link from 'next/link'
import styled from 'styled-components'

import { getAppPath } from '../../navigation/app'

import { useFreeHours } from './hooks/useFreeHours'
import { useProjectsBudgetedHours } from './hooks/useProjectsBudgetedHours'

const Container = styled(VStack)`
  gap: 8px;
  font-size: 14px;
`

export const ProjectsBudgetOverview = () => {
  const workBudetTotal = useWorkBudgetTotal()

  const budgetedHours = useProjectsBudgetedHours()
  const freeHours = useFreeHours()

  return (
    <Container>
      <HStack
        wrap="wrap"
        alignItems="center"
        fullWidth
        justifyContent="space-between"
      >
        <HStack gap={20}>
          <LabeledValue labelColor="supporting" name="Allocated">
            <Text color="contrast">
              {budgetedHours
                ? formatDuration(budgetedHours, 'h', {
                    maxUnit: 'h',
                  })
                : '-'}
            </Text>
          </LabeledValue>
          {freeHours > 0 && (
            <LabeledValue labelColor="supporting" name="Free">
              <Text color="contrast">
                {formatDuration(freeHours, 'h', {
                  maxUnit: 'h',
                })}
              </Text>
            </LabeledValue>
          )}
        </HStack>
        <Link href={getAppPath('preferences')}>
          <LabeledValue labelColor="supporting" name="Work budget">
            <Text color="contrast">
              {formatDuration(workBudetTotal, 'h', {
                maxUnit: 'h',
              })}
            </Text>
          </LabeledValue>
        </Link>
      </HStack>
      <ProjectsBudgetVisualization />
    </Container>
  )
}
