import { formatDuration } from '@lib/utils/time/formatDuration'
import styled from 'styled-components'
import { coloredTag } from '@lib/ui/css/coloredTag'
import { getColor } from '@lib/ui/theme/getters'
import { TaskTagContainer } from '../TaskTagContainer'
import { TimerIcon } from '@lib/ui/icons/TimerIcon'
import { ComponentWithValueProps } from '@lib/ui/props'
import { convertDuration } from '@lib/utils/time/convertDuration'

const Container = styled(TaskTagContainer)`
  ${({ theme: { colors } }) => coloredTag(colors.primary)};

  color: ${getColor('textPrimary')};
`

export const TaskTrackedTimeContent = ({
  value,
}: ComponentWithValueProps<number>) => {
  if (Math.round(convertDuration(value, 'ms', 'min')) < 1) {
    return null
  }

  return (
    <Container>
      <TimerIcon />
      {formatDuration(value, 'ms')}
    </Container>
  )
}
