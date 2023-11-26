import { css } from 'styled-components'

import { toSizeUnit } from './@increaser/ui/css/toSizeUnit'

export const horizontalMargin = (value: string | number) => css`
  margin-left: ${toSizeUnit(value)};
  margin-right: ${toSizeUnit(value)};
`
