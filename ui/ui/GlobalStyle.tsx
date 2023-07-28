import { createGlobalStyle } from 'styled-components'
import { themedScrollbarCSS } from './utils/themedScrollbarCSS'
import { getColor } from './theme/getters'

interface GlobalStyleProps {
  fontFamily: string
}

export const GlobalStyle = createGlobalStyle<GlobalStyleProps>`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  * {
    margin: 0;
    padding: 0;
  }

  html, body, #root, #__next {
    height: 100%;
  }

  body {
    -webkit-font-smoothing: antialiased;
  }
  img, picture, video, canvas, svg {
    max-width: 100%;
  }

  input, button, textarea, select {
    font: inherit;
  }

  a {
    color: inherit;
    cursor: pointer;
    text-decoration: none;
  }

  #root {
    isolation: isolate;
  }

  * {
    font-family: ${({ fontFamily }) => fontFamily}, sans-serif;
  }

  body {
    background: ${getColor('background')};
    color: ${getColor('text')};
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type=number] {
    -moz-appearance: textfield;
  }

  ${themedScrollbarCSS}
`
