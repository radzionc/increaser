import { css } from 'styled-components'

import { toSizeUnit } from './@increaser/ui/css/toSizeUnit'

export const verticalMargin = (value: string | number) => css`
  margin-top: ${toSizeUnit(value)};
  margin-bottom: ${toSizeUnit(value)};
`
