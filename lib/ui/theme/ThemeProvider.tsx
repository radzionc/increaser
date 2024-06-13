import { StyleSheetManager } from 'styled-components'
import isPropValid from '@emotion/is-prop-valid'
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components'

import { darkTheme } from './darkTheme'
import { ComponentWithChildrenProps } from '../props'

const shouldForwardProp = (propName: string, target: any) => {
  if (typeof target === 'string') {
    return isPropValid(propName)
  }
  return true
}

export const ThemeProvider = ({ children }: ComponentWithChildrenProps) => {
  return (
    <StyleSheetManager shouldForwardProp={shouldForwardProp}>
      <StyledComponentsThemeProvider theme={darkTheme}>
        {children}
      </StyledComponentsThemeProvider>
    </StyleSheetManager>
  )
}
