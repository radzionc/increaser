import { Panel } from '@lib/ui/panel/Panel'
import { ComponentWithChildrenProps } from '@lib/ui/props'
import styled from 'styled-components'
import { dayOverviewConfig } from './overview/config'

const Container = styled(Panel)`
  height: 100%;
`

export const SetsManagerContainer = ({
  children,
}: ComponentWithChildrenProps) => {
  return (
    <Container
      padding={dayOverviewConfig.horizontalPadding}
      withSections
      kind="secondary"
    >
      {children}
    </Container>
  )
}
