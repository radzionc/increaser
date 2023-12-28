import { ComponentWithChildrenProps } from '@lib/ui/props'
import { VStack } from '@lib/ui/layout/Stack'
import { Topbar } from './Topbar'

export const WebsitePageLayout = ({ children }: ComponentWithChildrenProps) => {
  return (
    <VStack style={{ minHeight: '100%' }} gap={20}>
      <Topbar />
      {children}
    </VStack>
  )
}
