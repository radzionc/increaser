import { useProjects } from '@increaser/app/projects/hooks/useProjects'
import { formatDuration } from '@lib/utils/time/formatDuration'
import { sum } from '@lib/utils/array/sum'
import { HStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'

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
        {total > 0
          ? formatDuration(total / weeks.length, 's', { maxUnit: 'h' })
          : '-'}
      </Text>
    </HStack>
  )
}
