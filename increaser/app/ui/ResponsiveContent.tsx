import { ElementSizeAware } from '@lib/ui/base/ElementSizeAware'
import { VStack } from '@lib/ui/layout/Stack'
import { ReactNode } from 'react'

interface ResponsiveContentProps {
  small: () => ReactNode
  normal: () => ReactNode
  breakpoint: number
}

export const ResponsiveContent = ({
  small,
  normal,
  breakpoint,
}: ResponsiveContentProps) => (
  <ElementSizeAware
    render={({ size, setElement }) => {
      const renderContent = () => {
        if (!size) {
          return null
        }

        if (size.width < breakpoint) {
          return small()
        }

        return normal()
      }

      return (
        <VStack ref={setElement}>
          <>{renderContent()}</>
        </VStack>
      )
    }}
  />
)
