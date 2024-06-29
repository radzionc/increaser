import { useFocus } from '@increaser/ui/focus/FocusContext'
import { ComponentWithChildrenProps } from '@lib/ui/props'
import { ThemeProvider, useTheme } from 'styled-components'
import { useFocusLauncher } from '../launcher/state/FocusLauncherContext'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'

export const FocusProjectThemeProvider = ({
  children,
}: ComponentWithChildrenProps) => {
  const { currentSet } = useFocus()
  const { projects } = useAssertUserState()
  const { projectId: focusLauncherProjectId } = useFocusLauncher()
  const theme = useTheme()

  const projectId = currentSet?.projectId ?? focusLauncherProjectId

  const { color } = projects[projectId]

  return (
    <ThemeProvider
      theme={{
        ...theme,
        colors: {
          ...theme.colors,
          primary: theme.colors.getLabelColor(color),
        },
      }}
    >
      {children}
    </ThemeProvider>
  )
}
