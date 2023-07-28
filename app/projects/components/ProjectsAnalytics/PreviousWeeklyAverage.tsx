import { useProjects } from 'projects/hooks/useProjects'
import { formatDuration } from 'shared/utils/formatDuration'
import { sum } from 'shared/utils/sum'
import { HStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'

export const PreviousWeeklyAverage = () => {
  const { weeks: partialWeeks } = useProjects()

  const weeks = partialWeeks.filter((week) => week.projects.length > 0)
  const total = sum(
    weeks.map(({ projects }) => sum(projects.map((p) => p.seconds))),
  )

  return (
    <HStack alignItems="center" gap={8}>
      <Text size={14} color="shy">
        Previous avg:
      </Text>
      <Text color="supporting" size={14} weight="bold">
        {total > 0 ? formatDuration(total / weeks.length, 's') : '-'}
      </Text>
    </HStack>
  )
}
