import { ComponentProps } from 'react'
import { VStack } from './Stack'

export const Center = (props: ComponentProps<typeof VStack>) => (
  <VStack
    fullWidth
    fullHeight
    alignItems="center"
    justifyContent="center"
    {...props}
  />
)
