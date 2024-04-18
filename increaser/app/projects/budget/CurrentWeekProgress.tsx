import { ProjectBudgetWidget } from './ProjectBudgetWidget'
import { CurrentProjectProvider } from '../components/ProjectView/CurrentProjectProvider'
import { VStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import { GoalsRequired } from './GoalsRequired'
import { useBudgetedProjects } from './hooks/useBudgetedProjects'

export const CurrentWeekProgress = () => {
  const projectsWithGoals = useBudgetedProjects()

  return (
    <VStack gap={20}>
      <Text color="contrast" weight="semibold">
        This week
      </Text>
      <GoalsRequired>
        <>
          {projectsWithGoals.map((project) => (
            <CurrentProjectProvider value={project} key={project.id}>
              <ProjectBudgetWidget />
            </CurrentProjectProvider>
          ))}
        </>
      </GoalsRequired>
    </VStack>
  )
}
