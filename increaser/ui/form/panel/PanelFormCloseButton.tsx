import { CloseButton } from '@lib/ui/buttons/CloseButton'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { tightListItemConfig } from '@lib/ui/list/tightListItemConfig'
import { OnClickProp } from '@lib/ui/props'
import styled from 'styled-components'
import { panelFormConfig } from './config'

const Container = styled.div`
  padding-right: ${toSizeUnit(tightListItemConfig.horizontalOffset)};
  padding-top: ${toSizeUnit(tightListItemConfig.horizontalOffset)};
`

const Content = styled(CloseButton)`
  ${sameDimensions(
    panelFormConfig.sectionMinHeight - tightListItemConfig.horizontalOffset,
  )};
  font-size: 20px;
`

export const PanelFormCloseButton = ({ onClick }: OnClickProp) => (
  <Container>
    <Content kind="secondary" size="l" onClick={onClick} />
  </Container>
)
