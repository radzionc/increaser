import { ComponentProps } from 'react'
import { Text } from '../Text'

export const ModalTitleText = (props: ComponentProps<typeof Text>) => (
  <Text color="regular" as="div" weight="bold" size={20} {...props} />
)
