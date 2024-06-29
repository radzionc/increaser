import { useFocus } from '@increaser/ui/focus/FocusContext'
import { useProjects } from '@increaser/ui/projects/ProjectsProvider'
import { ComponentWithChildrenProps } from '@lib/ui/props'
import { ThemeProvider, useTheme } from 'styled-components'
import { useFocusLauncher } from '../launcher/state/FocusLauncherContext'

export const FocusProjectThemeProvider = ({
  children,
}: ComponentWithChildrenProps) => {
  const { currentSet } = useFocus()
  const { projectsRecord } = useProjects()
  const { projectId: focusLauncherProjectId } = useFocusLauncher()
  const theme = useTheme()

  const projectId = currentSet?.projectId ?? focusLauncherProjectId

  const { hslaColor } = projectsRecord[projectId]

  return (
    <ThemeProvider
      theme={{
        ...theme,
        colors: {
          ...theme.colors,
          primary: hslaColor,
        },
      }}
    >
      {children}
    </ThemeProvider>
  )
}
