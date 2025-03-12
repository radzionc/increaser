import { Hoverable } from '@lib/ui/base/Hoverable'
import { tightListItemConfig } from '@lib/ui/list/tightListItemConfig'
import { OnClickProp } from '@lib/ui/props'
import styled from 'styled-components'

import { ProjectItemContent } from './ProjectItemContent'

const Container = styled(Hoverable)`
  text-align: start;
  width: 100%;
`

export const ProjectItem = ({ onClick }: OnClickProp) => {
  return (
    <Container
      onClick={onClick}
      verticalOffset={0}
      horizontalOffset={tightListItemConfig.horizontalOffset}
    >
      <ProjectItemContent />
    </Container>
  )
}
