import { borderRadius } from '@lib/ui/css/borderRadius'
import { HStack } from '@lib/ui/css/stack'
import { HStackSeparatedBy } from '@lib/ui/layout/StackSeparatedBy'
import { Text } from '@lib/ui/text'
import { EmphasizeNumbers } from '@lib/ui/text/EmphasizeNumbers'
import { getColor } from '@lib/ui/theme/getters'
import { formatDuration } from '@lib/utils/time/formatDuration'
import { toPercents } from '@lib/utils/toPercents'
import { getAppPath } from '@product/ui/navigation/app'
import { useCurrentProject } from '@product/ui/projects/CurrentProjectProvider'
import Link from 'next/link'
import styled from 'styled-components'

import { useProjectDoneMinutesThisWeek } from '../../hooks/useProjectDoneMinutesThisWeek'
import { ProjectGoalShyIndicator } from '../ProjectGoalShyIndicator'

const Container = styled(HStack)`
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  font-size: 14px;
  font-weight: 500;
`

const Pill = styled.span`
  ${borderRadius.s};
  display: inline-block;
  background: ${getColor('foreground')};
  padding: 4px 8px;
  font-size: 14px;
  font-weight: 500;
  color: ${getColor('textSupporting')};
`

export const ProjectBudgetWidgetHeader = () => {
  const { allocatedMinutesPerWeek, id, goal, name } = useCurrentProject()

  const doneMinutesThisWeek = useProjectDoneMinutesThisWeek(id)

  return (
    <Container>
      <HStack alignItems="center" gap={4}>
        <ProjectGoalShyIndicator value={goal ?? null} />
        <Text weight="500" color="contrast">
          {name}
        </Text>
      </HStack>
      <Link href={getAppPath('projects')}>
        <HStack gap={8}>
          <HStackSeparatedBy separator="/" gap={8} wrap="wrap">
            <Text weight="500" color="contrast">
              {doneMinutesThisWeek > 0
                ? formatDuration(doneMinutesThisWeek, 'min', {
                    maxUnit: 'h',
                  })
                : '-'}
            </Text>
            {allocatedMinutesPerWeek > 0 && (
              <Text color="supporting" weight="500">
                {formatDuration(allocatedMinutesPerWeek, 'min', {
                  maxUnit: 'h',
                })}
              </Text>
            )}
          </HStackSeparatedBy>
          <Pill>
            <EmphasizeNumbers
              value={toPercents(
                doneMinutesThisWeek / allocatedMinutesPerWeek,
                'round',
              )}
            />
          </Pill>
        </HStack>
      </Link>
    </Container>
  )
}
