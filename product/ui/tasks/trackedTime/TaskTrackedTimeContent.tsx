import { coloredTag } from '@lib/ui/css/coloredTag'
import { TimerIcon } from '@lib/ui/icons/TimerIcon'
import { ValueProp } from '@lib/ui/props'
import { getColor } from '@lib/ui/theme/getters'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { formatDuration } from '@lib/utils/time/formatDuration'
import styled from 'styled-components'

import { TaskTagContainer } from '../TaskTagContainer'

const Container = styled(TaskTagContainer)`
  ${({ theme: { colors } }) => coloredTag(colors.primary)};

  color: ${getColor('textPrimary')};
`

export const TaskTrackedTimeContent = ({ value }: ValueProp<number>) => {
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
