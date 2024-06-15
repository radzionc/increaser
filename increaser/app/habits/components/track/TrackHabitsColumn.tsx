import styled from 'styled-components'
import { trackHabitsConfig } from './config'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'

export const TrackHabitsColumn = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  row-gap: ${toSizeUnit(trackHabitsConfig.itemGap)};
  align-items: center;
  grid-auto-rows: ${toSizeUnit(trackHabitsConfig.itemHeight)};
`
