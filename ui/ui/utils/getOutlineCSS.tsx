import { css } from 'styled-components'

export const getOutlineCSS = (
  horizontalPadding: number,
  verticalPadding: number,
) => {
  return css`
    pointer-events: none;
    position: absolute;
    left: ${-horizontalPadding}px;
    top: ${-verticalPadding}px;
    width: calc(100% + ${horizontalPadding * 2}px);
    height: calc(100% + ${verticalPadding * 2}px);
  `
}
