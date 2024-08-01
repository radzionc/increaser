import styled from 'styled-components'
import { navigationConfig } from './config'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'

export const NavigationItemContentFrame = styled.div`
  display: grid;
  grid-template-columns: 24px 1fr;
  line-height: ${toSizeUnit(navigationConfig.itemLineHeight)};
  gap: 8px;
  font-weight: 500;

  > * {
    &:first-child {
      align-self: center;
      justify-self: center;
    }
  }
`
