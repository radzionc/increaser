import {
  ComponentWithChildrenProps,
  ComponentWithClassNameProps,
} from '../props'
import { VStack } from './Stack'

export const Center = ({
  children,
  className,
}: ComponentWithChildrenProps & ComponentWithClassNameProps) => (
  <VStack
    className={className}
    fullWidth
    fullHeight
    alignItems="center"
    justifyContent="center"
  >
    {children}
  </VStack>
)
