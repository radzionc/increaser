import { VStack } from '@lib/ui/layout/Stack'
import { ProjectBudgetItem } from '../../projects/budget/ProjectBudgetItem'
import { useBudgetedProjects } from './hooks/useBudgetedProjects'

export const ProjectsBudgetList = () => {
  const projects = useBudgetedProjects()

  return (
    <VStack gap={8}>
      {projects.map((project) => (
        <ProjectBudgetItem key={project.id} value={project} />
      ))}
    </VStack>
  )
}
