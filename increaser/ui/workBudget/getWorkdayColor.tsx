import { DefaultTheme } from 'styled-components'

export const getWorkdayColor = (theme: DefaultTheme) =>
  theme.colors.getLabelColor(5)
