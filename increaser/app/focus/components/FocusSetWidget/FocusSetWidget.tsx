import { HStack, VStack } from '@lib/ui/layout/Stack'
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
    <VStack gap={4}>
      <MinimalisticFocusSet />
      <Footer>
        <SessionStartedAt />
        <FocusNotifications />
      </Footer>
    </VStack>
  )
}
