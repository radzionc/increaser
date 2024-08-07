import { ProjectBudgetWidget } from './ProjectBudgetWidget'
import { CurrentProjectProvider } from '@increaser/ui/projects/CurrentProjectProvider'
import { VStack } from '@lib/ui/layout/Stack'
import { useBudgetedProjects } from './hooks/useBudgetedProjects'

export const CurrentWeekProgress = () => {
  const projects = useBudgetedProjects()

  return (
    <>
      {projects.map((project) => (
        <CurrentProjectProvider value={project} key={project.id}>
          <VStack gap={8}>
            <ProjectBudgetWidget />
          </VStack>
        </CurrentProjectProvider>
      ))}
    </>
  )
}
