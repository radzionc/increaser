import { borderRadius } from '@lib/ui/css/borderRadius'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import styled from 'styled-components'
import { taskItemMinHeight } from './TaskItemFrame'
import { getColor } from '@lib/ui/theme/getters'
import { centerContent } from '@lib/ui/css/centerContent'

const Container = styled.div`
  ${borderRadius.s};
  height: ${toSizeUnit(taskItemMinHeight)};
  border: 2px dashed ${getColor('mistExtra')};
  ${centerContent};
  size: 14px;
  color: ${getColor('textSupporting')};
`
export const DropPrompt = () => <Container>Drag here</Container>
