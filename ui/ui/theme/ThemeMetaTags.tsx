import { useTheme } from 'styled-components'

export const ThemeMetaTags = () => {
  const { colors } = useTheme()

  return (
    <>
      <meta name="theme-color" content={colors.background.toCssValue()} />
    </>
  )
}
