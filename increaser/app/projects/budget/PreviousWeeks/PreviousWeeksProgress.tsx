import { CurrentProjectProvider } from '../../components/ProjectView/CurrentProjectProvider'
import { VStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import { GoalsRequired } from '../GoalsRequired'
import { ProjectPreviousWeeks } from '../ProjectPreviousWeeks'
import { useBudgetedProjects } from '../hooks/useBudgetedProjects'
import { pluralize } from '@lib/utils/pluralize'
import { previousWeeksConfig } from './previousWeeksConfig'

export const PreviousWeeksProgress = () => {
  const projectsWithGoals = useBudgetedProjects()

  return (
    <VStack gap={20}>
      <Text color="contrast" weight="semibold">
        Previous {pluralize(previousWeeksConfig.weeks, 'week')}
      </Text>
      <GoalsRequired>
        <>
          {projectsWithGoals.map((project) => (
            <CurrentProjectProvider value={project} key={project.id}>
              <ProjectPreviousWeeks />
            </CurrentProjectProvider>
          ))}
        </>
      </GoalsRequired>
    </VStack>
  )
}
