import { ComponentWithChildrenProps } from '../../shared/props'
import { Text } from '../Text'

export const ModalTitleText = ({ children }: ComponentWithChildrenProps) => (
  <Text color="regular" as="div" weight="extraBold" size={22}>
    {children}
  </Text>
)
