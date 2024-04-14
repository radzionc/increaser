import { HStack, VStack } from '@lib/ui/layout/Stack'
import { useCurrentProject } from '../components/ProjectView/CurrentProjectProvider'
import { Text } from '@lib/ui/text'
import { ProjectGoalChart } from './PreviousWeeks/ProjectGoalChart'
import { useCurrentProjectPrevWeeks } from '../hooks/useCurrentProjectPrevWeeks'
import { ShyInfoBlock } from '@lib/ui/info/ShyInfoBlock'
import { previousWeeksConfig } from './PreviousWeeks/previousWeeksConfig'

export const ProjectPreviousWeeks = () => {
  const { name } = useCurrentProject()
  const weeks = useCurrentProjectPrevWeeks(previousWeeksConfig.weeks)

  return (
    <VStack gap={4}>
      {weeks.some((week) => week.seconds > 0) ? (
        weeks.length > 1 ? (
          <ProjectGoalChart value={weeks} />
        ) : (
          <ShyInfoBlock>Not enough data to display the chart</ShyInfoBlock>
        )
      ) : (
        <ShyInfoBlock>No time tracked in the previous weeks</ShyInfoBlock>
      )}
      <HStack alignItems="center" justifyContent="center" fullWidth gap={4}>
        <Text weight="semibold" color="contrast" size={14}>
          {name}
        </Text>
      </HStack>
    </VStack>
  )
}
