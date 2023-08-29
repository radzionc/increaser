import { ComponentWithChildrenProps } from '@increaser/ui/props'
import { PrefferedThemeProvider } from '@increaser/ui/ui/theme/PrefferedThemeProvider'
import { ThemePreference } from '@increaser/ui/ui/theme/ThemePreference'
import { useState } from 'react'

export const ThemeProvider = ({ children }: ComponentWithChildrenProps) => {
  const [prefferedTheme, setPrefferedTheme] = useState<ThemePreference>('dark')

  return (
    <PrefferedThemeProvider
      prefferedTheme={prefferedTheme}
      setPrefferedTheme={setPrefferedTheme}
    >
      {children}
    </PrefferedThemeProvider>
  )
}
