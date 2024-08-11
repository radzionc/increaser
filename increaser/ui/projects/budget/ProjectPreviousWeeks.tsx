import { HStack, VStack } from '@lib/ui/layout/Stack'
import { useCurrentProject } from '@increaser/ui/projects/CurrentProjectProvider'
import { Text } from '@lib/ui/text'
import { ProjectGoalChart } from './PreviousWeeks/ProjectGoalChart'
import { useCurrentProjectPrevWeeks } from '@increaser/ui/projects/hooks/useCurrentProjectPrevWeeks'
import { ShyInfoBlock } from '@lib/ui/info/ShyInfoBlock'
import { previousWeeksConfig } from './PreviousWeeks/previousWeeksConfig'
import { Circle } from '@lib/ui/layout/Circle'
import styled, { useTheme } from 'styled-components'
import { round } from '@lib/ui/css/round'
import { getColor } from '@lib/ui/theme/getters'

const Pill = styled.div`
  ${round};
  padding: 4px 8px;
  background: ${getColor('mist')};
`

export const ProjectPreviousWeeks = () => {
  const { name, color } = useCurrentProject()
  const weeks = useCurrentProjectPrevWeeks(previousWeeksConfig.weeks)
  const { colors } = useTheme()

  return (
    <VStack gap={12}>
      {weeks.some((week) => week.seconds > 0) ? (
        <ProjectGoalChart value={weeks} />
      ) : (
        <ShyInfoBlock>No time tracked in the previous weeks</ShyInfoBlock>
      )}
      <HStack alignItems="center" justifyContent="center" fullWidth gap={6}>
        <Pill>
          <HStack alignItems="center" fullWidth gap={8}>
            <Circle size={8} background={colors.getLabelColor(color)} />
            <Text size={14} weight="500">
              {name}
            </Text>
          </HStack>
        </Pill>
      </HStack>
    </VStack>
  )
}
