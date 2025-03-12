import { borderRadius } from '@lib/ui/css/borderRadius'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import styled from 'styled-components'

import { trackedTimeChartConfig } from './config'

export const BarChartItemContainer = styled.div`
  width: calc(100% - ${toSizeUnit(trackedTimeChartConfig.spaceBetweenBars)});
  margin-left: ${toSizeUnit(trackedTimeChartConfig.spaceBetweenBars / 2)};
  ${borderRadius.s};
  overflow: hidden;
`
