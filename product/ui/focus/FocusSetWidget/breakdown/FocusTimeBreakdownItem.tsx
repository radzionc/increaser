import { HStack } from '@lib/ui/css/stack'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { ValueProp } from '@lib/ui/props'
import { Text } from '@lib/ui/text'
import { getIntervalDuration } from '@lib/utils/interval/getIntervalDuration'
import { Interval } from '@lib/utils/interval/Interval'
import { formatDuration } from '@lib/utils/time/formatDuration'
import styled from 'styled-components'

import { focusBreakdownConfig } from './config'
import { FocusBreakdownItemInfo } from './FocusBreakdownItemInfo'

const Container = styled(HStack)`
  align-items: center;
  justify-content: space-between;
  width: 100%;

  height: ${toSizeUnit(focusBreakdownConfig.itemHeight)};
`

const formatIntervalDuration = (interval: Interval) =>
  formatDuration(getIntervalDuration(interval), 'ms', {
    minUnit: 's',
    maxUnit: 'h',
  })

export const FocusTimeBreakdownItem = ({
  value: { kind, name, interval },
}: ValueProp<FocusBreakdownItemInfo>) => {
  return (
    <Container>
      <Text color={kind === 'primary' ? 'contrast' : 'shy'}>{name}</Text>
      <Text color={kind === 'primary' ? 'contrast' : 'supporting'}>
        {formatIntervalDuration(interval)}
      </Text>
    </Container>
  )
}
