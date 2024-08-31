import { borderRadius } from '@lib/ui/css/borderRadius'
import { coloredTag } from '@lib/ui/css/coloredTag'
import { getColor } from '@lib/ui/theme/getters'
import styled from 'styled-components'

export const TaskTagContainer = styled.span`
  ${borderRadius.s};
  padding: 4px 8px;
  font-weight: 600;
  ${({ theme: { colors } }) => coloredTag(colors.idle)};

  color: ${getColor('idle')};

  font-size: 13px;
  font-weight: 600;
`
