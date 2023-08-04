import { ComponentProps } from 'react'
import { Text } from '../Text'

export const ModalTitleText = (props: ComponentProps<typeof Text>) => (
  <Text color="regular" as="div" weight="extraBold" size={20} {...props} />
)
