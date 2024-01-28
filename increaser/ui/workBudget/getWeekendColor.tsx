import { DefaultTheme } from 'styled-components'

export const getWeekendColor = (theme: DefaultTheme) =>
  theme.colors.getLabelColor(10)
