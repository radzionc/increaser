import { HStack, VStack } from '@lib/ui/layout/Stack'
import { FocusAudioWidget } from '../../audio/FocusAudioWidget'
import { MinimalisticFocusSet } from './MinimalisticFocusSet'
import { SessionStartedAt } from '@increaser/ui/focus/SessionStartedAt'
import styled from 'styled-components'
import { FocusNotifications } from '../FocusNotifications'

const Footer = styled(HStack)`
  align-items: center;
  width: 100%;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
  font-size: 14px;
`

export const FocusSetWidget = () => {
  return (
    <VStack style={{ flex: 1 }} gap={40}>
      <VStack gap={4}>
        <MinimalisticFocusSet />
        <Footer>
          <SessionStartedAt />
          <FocusNotifications />
        </Footer>
      </VStack>
      <FocusAudioWidget />
    </VStack>
  )
}
