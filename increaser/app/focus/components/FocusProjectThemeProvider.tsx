import { useFocus } from '@increaser/ui/focus/FocusContext'
import { useProjects } from '@increaser/ui/projects/ProjectsProvider'
import { ComponentWithChildrenProps } from '@lib/ui/props'
import { ThemeProvider, useTheme } from 'styled-components'

export const FocusProjectThemeProvider = ({
  children,
}: ComponentWithChildrenProps) => {
  const { currentSet } = useFocus()
  const { projectsRecord } = useProjects()

  const theme = useTheme()
  if (!currentSet) return <>{children}</>

  const { projectId } = currentSet
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
