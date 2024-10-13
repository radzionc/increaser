import styled from 'styled-components'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { sidebarConfig } from './config'

export const NavigationItemContentFrame = styled.div`
  display: grid;
  grid-template-columns: 24px 1fr;
  line-height: ${toSizeUnit(sidebarConfig.item.lineHeight)};
  gap: 12px;
  font-weight: 600;
  font-size: 14px;

  > * {
    &:first-child {
      align-self: center;
      justify-self: center;
      font-size: 24px;
      stroke-width: 1.5;
    }
  }
`
