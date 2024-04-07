import { useProjects } from '@increaser/ui/projects/ProjectsProvider'
import { VStack } from '@lib/ui/layout/Stack'
import { ProjectBudgetItem } from '../../projects/budget/ProjectBudgetItem'
import { order } from '@lib/utils/array/order'

export const ProjectsBudgetList = () => {
  const { activeProjects } = useProjects()
  const projectsWithGoals = activeProjects.filter(
    (project) => project.allocatedMinutesPerWeek,
  )

  return (
    <VStack gap={8}>
      {order(projectsWithGoals, (p) => p.allocatedMinutesPerWeek, 'desc').map(
        (value) => (
          <ProjectBudgetItem value={value} key={value.id} />
        ),
      )}
    </VStack>
  )
}
