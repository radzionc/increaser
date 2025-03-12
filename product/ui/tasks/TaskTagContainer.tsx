import { borderRadius } from '@lib/ui/css/borderRadius'
import { coloredTag } from '@lib/ui/css/coloredTag'
import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { getColor } from '@lib/ui/theme/getters'
import styled from 'styled-components'

export const TaskTagContainer = styled.span`
  display: inline-block;
  ${borderRadius.s};
  ${horizontalPadding(4)};
  font-weight: 600;
  ${({ theme: { colors } }) => coloredTag(colors.idle)};

  color: ${getColor('idle')};

  font-size: 13px;
  font-weight: 600;

  white-space: nowrap;

  flex-shrink: 0;

  display: inline-flex;
  align-items: center;
  gap: 4px;
`
