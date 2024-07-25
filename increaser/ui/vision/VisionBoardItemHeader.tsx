import { borderRadius } from '@lib/ui/css/borderRadius'
import { getColor } from '@lib/ui/theme/getters'
import styled from 'styled-components'

export const VisionBoardItemHeader = styled.div`
  width: 100%;
  padding: 12px;

  ${borderRadius.m}
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border: 1px solid ${getColor('mist')};
  background: ${getColor('foreground')};

  font-size: 14px;
  font-weight: 500;
`
