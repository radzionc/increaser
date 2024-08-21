import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { Header } from '@lib/ui/layout/Header'
import { getColor } from '@lib/ui/theme/getters'
import styled from 'styled-components'
import { sidebarConfig } from '../../../navigation/Sidebar/config'
import { ComponentWithChildrenProps } from '@lib/ui/props'
import { ComponentProps, ReactNode } from 'react'
import { HStack } from '@lib/ui/layout/Stack'
import { useSetPageHeaderControlsArea } from './PageHeaderControlsAreaProvider'

const Container = styled(Header)`
  height: ${toSizeUnit(sidebarConfig.headerHeight)};
  border-bottom: 2px solid ${getColor('mist')};
`

type PageHeaderProps = ComponentWithChildrenProps & {
  controls?: ReactNode
} & ComponentProps<typeof Container>

export const PageHeader = ({
  children,
  controls,
  ...rest
}: PageHeaderProps) => {
  const setControlsArea = useSetPageHeaderControlsArea()

  return (
    <Container {...rest}>
      {children}
      <HStack gap={8} alignItems="center">
        <HStack ref={setControlsArea} gap={8} alignItems="center" />
        {controls}
      </HStack>
    </Container>
  )
}
