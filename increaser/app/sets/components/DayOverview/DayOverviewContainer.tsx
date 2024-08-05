import { Panel } from '@lib/ui/panel/Panel'
import { ComponentProps } from 'react'
import styled from 'styled-components'
import { dayOverviewConfig } from './config'

const Container = styled(Panel)`
  height: 100%;
`

type DayOverviewContainerProps = ComponentProps<typeof Container> & {
  as?: React.ElementType
}

export const DayOverviewContainer = (props: DayOverviewContainerProps) => (
  <Container
    padding={dayOverviewConfig.horizontalPadding}
    withSections
    kind="secondary"
    {...props}
  />
)
