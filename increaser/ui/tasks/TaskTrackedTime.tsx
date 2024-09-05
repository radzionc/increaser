import { useCurrentTask } from '@increaser/ui/tasks/CurrentTaskProvider'
import { formatDuration } from '@lib/utils/time/formatDuration'
import styled from 'styled-components'
import { coloredTag } from '@lib/ui/css/coloredTag'
import { getColor } from '@lib/ui/theme/getters'
import { TaskTagContainer } from './TaskTagContainer'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { TimerIcon } from '@lib/ui/icons/TimerIcon'

const Container = styled(TaskTagContainer)`
  ${({ theme: { colors } }) => coloredTag(colors.primary)};

  color: ${getColor('textPrimary')};
`

const IconContainer = styled.span`
  vertical-align: middle;
  margin-right: 4px;
`

export const TaskTrackedTime = () => {
  const { spentTime } = useCurrentTask()

  if (!spentTime || Math.round(convertDuration(spentTime, 'ms', 'min')) < 1) {
    return null
  }

  return (
    <Container>
      <IconContainer>
        <TimerIcon />
      </IconContainer>
      {formatDuration(spentTime, 'ms')}
    </Container>
  )
}
