import { ElementSizeAware } from '@increaser/ui/ui/ElementSizeAware'
import { VStack } from '@increaser/ui/ui/Stack'
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
