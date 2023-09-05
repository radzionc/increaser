import { css } from 'styled-components'
import { getColor } from '../theme/getters'

export const getOutlineCSS = (
  horizontalPadding: number,
  verticalPadding: number,
) => {
  return css`
    pointer-events: none;
    position: absolute;
    left: ${-horizontalPadding}px;
    top: ${-verticalPadding}px;
    border: 2px solid ${getColor('primary')};
    width: calc(100% + ${horizontalPadding * 2}px);
    height: calc(100% + ${verticalPadding * 2}px);
  `
}
