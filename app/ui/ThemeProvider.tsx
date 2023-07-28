import { ComponentWithChildrenProps } from '@increaser/ui/shared/props'
import { PrefferedThemeProvider } from '@increaser/ui/ui/theme/PrefferedThemeProvider'
import { ThemePreference } from '@increaser/ui/ui/theme/ThemePreference'
import {
  PersistentStorageKey,
  usePersistentStorageValue,
} from 'state/persistentStorage'

export const ThemeProvider = ({ children }: ComponentWithChildrenProps) => {
  const [prefferedTheme, setPrefferedTheme] =
    usePersistentStorageValue<ThemePreference>(
      PersistentStorageKey.ThemePreference,
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
