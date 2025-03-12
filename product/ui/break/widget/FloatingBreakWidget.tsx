import { RhythmicRerender } from '@lib/ui/base/RhythmicRerender'
import { IconButton } from '@lib/ui/buttons/IconButton'
import { centerContent } from '@lib/ui/css/centerContent'
import { HStack, vStack } from '@lib/ui/css/stack'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { CloseIcon } from '@lib/ui/icons/CloseIcon'
import { Text } from '@lib/ui/text'
import { getColor } from '@lib/ui/theme/getters'
import { widescreenRatio } from '@lib/ui/video/config'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { useLastSetEnd } from '@product/app/sets/hooks/useLastSetEnd'
import styled from 'styled-components'

import { floatingWidgetConfig } from '../../floatingWidget/config'
import { FloatingWidgetContainer } from '../../floatingWidget/FloatingWidgetContainer'
import { FloatingWidgetHeader } from '../../floatingWidget/FloatingWidgetHeader'
import { ManageFloatingWidgetPosition } from '../../floatingWidget/ManageFloatingWidgetPosition'
import { BreakCountdown } from '../BreakCountdown'
import { ManageBreakDuration } from '../duration/ManageBreakDuration'
import { useBreakDuration } from '../duration/state/useBreakDuration'
import { ManageBreakNotifications } from '../notifications/ManageBreakNotifications'

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

  const lastSetEnd = useLastSetEnd()

  if (!breakDuration || !lastSetEnd) {
    return null
  }

  return (
    <FloatingWidgetContainer>
      <FloatingWidgetHeader>
        <RhythmicRerender
          render={(now) => {
            const duration = now - lastSetEnd
            const hasExpired =
              duration > convertDuration(breakDuration, 'min', 'ms')

            return (
              <Text color={hasExpired ? 'idle' : undefined}>
                {breakDuration}-minute break
              </Text>
            )
          }}
        />
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
