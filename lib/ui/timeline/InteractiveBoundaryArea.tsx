import styled from 'styled-components'
import { getColor } from '../theme/getters'

export const InteractiveBoundaryArea = styled.div`
  width: 100%;
  cursor: row-resize;
  height: 10px;
  background: ${getColor('mistExtra')};
`
