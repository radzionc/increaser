import { ProjectBudgetWidget } from './ProjectBudgetWidget'
import { CurrentProjectProvider } from '@increaser/ui/projects/CurrentProjectProvider'
import { VStack } from '@lib/ui/layout/Stack'
import { useBudgetedProjects } from './hooks/useBudgetedProjects'
import { SectionTitle } from '@lib/ui/text/SectionTitle'
import { BudgetRequired } from './BudgetRequired'

export const CurrentWeekProgress = () => {
  const projects = useBudgetedProjects()

  return (
    <VStack gap={20}>
      <SectionTitle>This week</SectionTitle>
      <BudgetRequired>
        <>
          {projects.map((project) => (
            <CurrentProjectProvider value={project} key={project.id}>
              <VStack gap={8}>
                <ProjectBudgetWidget />
              </VStack>
            </CurrentProjectProvider>
          ))}
        </>
      </BudgetRequired>
    </VStack>
  )
}
