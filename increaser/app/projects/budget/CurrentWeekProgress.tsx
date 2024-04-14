import { ProjectBudgetWidget } from './ProjectBudgetWidget'
import { CurrentProjectProvider } from '../components/ProjectView/CurrentProjectProvider'
import { VStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import { useProjectsWithGoals } from './hooks/useProjectsWithGoals'
import { GoalsRequired } from './GoalsRequired'

export const CurrentWeekProgress = () => {
  const projectsWithGoals = useProjectsWithGoals()

  return (
    <VStack gap={20}>
      <Text color="contrast" weight="semibold">
        This week progress
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
