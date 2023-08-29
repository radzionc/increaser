import { ComponentWithChildrenProps } from '@increaser/ui/props'
import { VStack } from '@increaser/ui/ui/Stack'
import { Topbar } from './Topbar'

export const WebsitePageLayout = ({ children }: ComponentWithChildrenProps) => {
  return (
    <VStack style={{ minHeight: '100%' }} gap={20}>
      <Topbar />
      {children}
    </VStack>
  )
}
