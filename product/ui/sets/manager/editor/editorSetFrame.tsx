import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { css } from 'styled-components'

import { dayOverviewConfig } from '../overview/config'

export const editorSetFrame = css`
  left: ${toSizeUnit(dayOverviewConfig.timeLabelGap)};
  width: calc(100% - ${toSizeUnit(dayOverviewConfig.timeLabelGap)});
`
