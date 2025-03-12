import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { verticalPadding } from '@lib/ui/css/verticalPadding'
import styled from 'styled-components'

import { trackHabitsConfig } from './config'

export const TrackHabitsColumn = styled.div`
  ${verticalPadding(trackHabitsConfig.itemGap / 2)};
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  row-gap: ${toSizeUnit(trackHabitsConfig.itemGap)};
  align-items: center;
  grid-auto-rows: ${toSizeUnit(trackHabitsConfig.itemHeight)};
  justify-items: center;
`
