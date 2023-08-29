import { ComponentWithChildrenProps } from '@increaser/ui/props'
import { PrefferedThemeProvider } from '@increaser/ui/ui/theme/PrefferedThemeProvider'
import { ThemePreference } from '@increaser/ui/ui/theme/ThemePreference'
import { PersistentStateKey, usePersistentState } from 'state/persistentStorage'

export const ThemeProvider = ({ children }: ComponentWithChildrenProps) => {
  const [prefferedTheme, setPrefferedTheme] =
    usePersistentState<ThemePreference>(
      PersistentStateKey.ThemePreference,
      'dark',
    )

  return (
    <PrefferedThemeProvider
      prefferedTheme={prefferedTheme}
      setPrefferedTheme={setPrefferedTheme}
    >
      {children}
    </PrefferedThemeProvider>
  )
}
