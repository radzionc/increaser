import styled, { css } from 'styled-components'

import { defaultBorderRadiusCSS } from '../borderRadius'
import { getCSSUnit } from '../utils/getCSSUnit'
import { getColor } from '../theme/getters'
import { match } from '../../shared/utils/match'

type PanelKind = 'regular' | 'secondary'

export interface PanelProps {
  width?: React.CSSProperties['width']
  padding?: React.CSSProperties['padding']
  direction?: React.CSSProperties['flexDirection']

  kind?: PanelKind

  withSections?: boolean
}

const panelPaddingCSS = css<{ padding?: React.CSSProperties['padding'] }>`
  padding: ${({ padding }) => getCSSUnit(padding || 20)};
`

export const Panel = styled.div<PanelProps>`
  ${defaultBorderRadiusCSS};
  width: ${({ width }) => (width ? getCSSUnit(width) : undefined)};
  overflow: hidden;

  ${({ withSections, direction = 'column', kind = 'regular', theme }) => {
    const contentBackground = match(kind, {
      secondary: () => theme.colors.background.toCssValue(),
      regular: () => theme.colors.mist.toCssValue(),
    })

    const contentCSS = css`
      ${panelPaddingCSS}
      background: ${contentBackground};
    `

    return withSections
      ? css`
          display: flex;
          flex-direction: ${direction};
          gap: 1px;

          > * {
            ${contentCSS}
          }
        `
      : contentCSS
  }}

  ${({ kind }) =>
    kind === 'secondary' &&
    css`
      border: 2px solid ${getColor('mist')};
    `}
`
