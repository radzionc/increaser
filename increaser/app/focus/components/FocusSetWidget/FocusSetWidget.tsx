import { HStack, VStack } from '@lib/ui/css/stack'
import { MinimalisticFocusSet } from './MinimalisticFocusSet'
import styled from 'styled-components'
import { FocusNotifications } from '../FocusNotifications'

const Footer = styled(HStack)`
  align-items: center;
  width: 100%;
  justify-content: end;
  gap: 20px;
  flex-wrap: wrap;
  font-size: 14px;
`

export const FocusSetWidget = () => {
  return (
    <VStack gap={4}>
      <MinimalisticFocusSet />
      <Footer>
        <FocusNotifications />
      </Footer>
    </VStack>
  )
}
