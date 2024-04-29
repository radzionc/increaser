import { ProjectBudgetWidget } from './ProjectBudgetWidget'
import { CurrentProjectProvider } from '../components/ProjectView/CurrentProjectProvider'
import { VStack } from '@lib/ui/layout/Stack'
import { GoalsRequired } from './GoalsRequired'
import { useBudgetedProjects } from './hooks/useBudgetedProjects'
import { SectionTitle } from '@lib/ui/text/SectionTitle'

export const CurrentWeekProgress = () => {
  const projects = useBudgetedProjects()

  return (
    <VStack gap={20}>
      <SectionTitle>This week</SectionTitle>
      <GoalsRequired>
        <>
          {projects.map((project) => (
            <CurrentProjectProvider value={project} key={project.id}>
              <ProjectBudgetWidget />
            </CurrentProjectProvider>
          ))}
        </>
      </GoalsRequired>
    </VStack>
  )
}
