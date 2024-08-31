import { useCurrentTask } from '@increaser/ui/tasks/CurrentTaskProvider'
import { formatDuration } from '@lib/utils/time/formatDuration'
import styled from 'styled-components'
import { coloredTag } from '@lib/ui/css/coloredTag'
import { getColor } from '@lib/ui/theme/getters'
import { TaskTagContainer } from './TaskTagContainer'

const Container = styled(TaskTagContainer)`
  ${({ theme: { colors } }) => coloredTag(colors.primary)};

  color: ${getColor('textPrimary')};
`

export const TaskTrackedTime = () => {
  const { spentTime } = useCurrentTask()

  if (!spentTime) return null

  return <Container>{formatDuration(spentTime, 'ms')}</Container>
}
