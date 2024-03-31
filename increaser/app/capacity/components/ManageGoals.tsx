import { ProjectGoalInput } from '@increaser/app/projects/components/ProjectGoalInput'
import { CurrentProjectProvider } from '@increaser/app/projects/components/ProjectView/CurrentProjectProvider'
import { VStack } from '@lib/ui/layout/Stack'

import { useProjects } from '@increaser/ui/projects/ProjectsProvider'
import { ProjectsBudgetOverview } from '../../projects/budget/ProjectsBudgetOverview'

export const ManageGoals = () => {
  const { activeProjects } = useProjects()

  const projects = [...activeProjects].sort((a, b) => b.total - a.total)

  return (
    <>
      <VStack gap={40}>
        <ProjectsBudgetOverview />
        <VStack gap={8}>
          {projects.map((project) => (
            <CurrentProjectProvider key={project.id} value={project}>
              <ProjectGoalInput />
            </CurrentProjectProvider>
          ))}
        </VStack>
      </VStack>
    </>
  )
}
