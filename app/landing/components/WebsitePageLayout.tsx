import { ComponentWithChildrenProps } from '@increaser/ui/shared/props'
import { VStack } from '@increaser/ui/ui/Stack'
import { Topbar } from './Topbar'

export const WebsitePageLayout = ({ children }: ComponentWithChildrenProps) => {
  return (
    <VStack gap={20}>
      <Topbar />
      {children}
    </VStack>
  )
}
