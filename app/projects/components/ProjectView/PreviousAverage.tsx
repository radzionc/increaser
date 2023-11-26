import { formatDuration } from '@increaser/utils/time/formatDuration'
import { sum } from '@increaser/utils/array/sum'
import { Text } from '@increaser/ui/text'

import { useCurrentProject } from './CurrentProjectProvider'

export const PreviousAverage = () => {
  const { weeks } = useCurrentProject()
  if (!weeks.length) return null

  const value = sum(weeks.map(({ seconds }) => seconds)) / weeks.length
  if (!value) return null

  return (
    <Text size={14} color="supporting">
      Previous avg
      <Text weight="bold" style={{ marginLeft: 8 }} color="regular" as="span">
        {formatDuration(value, 's', { maxUnit: 'h' })}
      </Text>
    </Text>
  )
}
