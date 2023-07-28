import { formatDuration } from 'shared/utils/formatDuration'
import { sum } from 'shared/utils/sum'
import { Text } from '@increaser/ui/ui/Text'

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
        {formatDuration(value, 's')}
      </Text>
    </Text>
  )
}
