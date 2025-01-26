import { HStack, vStack } from '@lib/ui/css/stack'
import { IconButton } from '@lib/ui/buttons/IconButton'
import { CloseIcon } from '@lib/ui/icons/CloseIcon'
import { useBreakDuration } from '../duration/state/useBreakDuration'
import { FloatingWidgetContainer } from '../../floatingWidget/FloatingWidgetContainer'
import { ManageFloatingWidgetPosition } from '../../floatingWidget/ManageFloatingWidgetPosition'
import { FloatingWidgetHeader } from '../../floatingWidget/FloatingWidgetHeader'
import styled from 'styled-components'
import { getColor } from '@lib/ui/theme/getters'
import { widescreenRatio } from '@lib/ui/video/config'
import { ManageBreakNotifications } from '../notifications/ManageBreakNotifications'
import { floatingWidgetConfig } from '../../floatingWidget/config'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { ManageBreakDuration } from '../duration/ManageBreakDuration'
import { centerContent } from '@lib/ui/css/centerContent'
import { BreakCountdown } from '../BreakCountdown'

const Container = styled.div`
  overflow: hidden;
  width: 100%;
  aspect-ratio: ${widescreenRatio} / 1;
  background: ${getColor('foreground')};
  padding: ${toSizeUnit(floatingWidgetConfig.padding)};
  padding-top: 0;
  ${vStack()};
`

const Content = styled.div`
  ${centerContent};
  flex: 1;
`

export const FloatingBreakWidget = () => {
  const [breakDuration, setBreakDuration] = useBreakDuration()

  if (!breakDuration) {
    return null
  }

  return (
    <FloatingWidgetContainer>
      <FloatingWidgetHeader>
        {breakDuration}-minute break
        <HStack>
          <ManageFloatingWidgetPosition />
          <IconButton
            kind="secondary"
            title="Stop break"
            onClick={() => setBreakDuration(null)}
            icon={<CloseIcon />}
          />
        </HStack>
      </FloatingWidgetHeader>
      <Container>
        <Content>
          <BreakCountdown />
        </Content>
        <HStack gap={4} alignItems="center" justifyContent="space-between">
          <ManageBreakDuration />
          <ManageBreakNotifications />
        </HStack>
      </Container>
    </FloatingWidgetContainer>
  )
}
