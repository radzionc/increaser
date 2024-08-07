import styled from 'styled-components'
import { navigationConfig } from './config'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'

export const NavigationItemContentFrame = styled.div`
  display: grid;
  grid-template-columns: 24px 1fr;
  line-height: ${toSizeUnit(navigationConfig.itemLineHeight)};
  gap: 12px;
  font-weight: 600;
  font-size: 14px;

  > * {
    &:first-child {
      align-self: center;
      justify-self: center;
      font-size: 24px;
    }
  }
`
