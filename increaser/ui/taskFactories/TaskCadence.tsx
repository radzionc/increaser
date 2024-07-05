import styled from 'styled-components'
import { useCurrentTaskFactory } from './CurrentTaskFactoryProvider'
import { HStack } from '@lib/ui/layout/Stack'
import { round } from '@lib/ui/css/round'
import { getColor } from '@lib/ui/theme/getters'
import { centerContent } from '@lib/ui/css/centerContent'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { taskCadenceShortName } from '@increaser/entities/TaskFactory'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { RefreshIcon } from '@lib/ui/icons/RefreshIcon'
import { Text } from '@lib/ui/text'
import { tightListItemConfig } from '@lib/ui/list/tightListItemConfig'

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
