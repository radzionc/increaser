import styled from 'styled-components'
import { Hoverable } from '@lib/ui/base/Hoverable'
import { ProjectItemContent } from './ProjectItemContent'
import { tightListItemConfig } from '@lib/ui/list/tightListItemConfig'
import { OnClickProp } from '@lib/ui/props'

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
