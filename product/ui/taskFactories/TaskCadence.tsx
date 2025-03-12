import { centerContent } from '@lib/ui/css/centerContent'
import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { round } from '@lib/ui/css/round'
import { HStack } from '@lib/ui/css/stack'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { RefreshIcon } from '@lib/ui/icons/RefreshIcon'
import { tightListItemConfig } from '@lib/ui/list/tightListItemConfig'
import { Text } from '@lib/ui/text'
import { getColor } from '@lib/ui/theme/getters'
import { taskCadenceShortName } from '@product/entities/TaskFactory'
import styled from 'styled-components'

import { useCurrentTaskFactory } from './CurrentTaskFactoryProvider'

const Container = styled(HStack)`
  align-items: center;
  gap: 8px;
  ${round};
  background: ${getColor('foreground')};
  ${centerContent};
  height: ${toSizeUnit(tightListItemConfig.lineHeight)};
  font-weight: 500;
  font-size: 14px;
  ${horizontalPadding(12)};

  svg {
    color: ${getColor('textSupporting')};
    font-size: 12px;
  }
`

export const TaskCadence = () => {
  const { cadence } = useCurrentTaskFactory()

  return (
    <Container>
      <IconWrapper>
        <RefreshIcon />
      </IconWrapper>
      <Text nowrap>{taskCadenceShortName[cadence]}</Text>
    </Container>
  )
}
