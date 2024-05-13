import { CurrentProjectProvider } from '@increaser/ui/projects/CurrentProjectProvider'
import { VStack } from '@lib/ui/layout/Stack'
import { GoalsRequired } from '../GoalsRequired'
import { ProjectPreviousWeeks } from '../ProjectPreviousWeeks'
import { useBudgetedProjects } from '../hooks/useBudgetedProjects'
import { pluralize } from '@lib/utils/pluralize'
import { previousWeeksConfig } from './previousWeeksConfig'
import { SectionTitle } from '@lib/ui/text/SectionTitle'

export const PreviousWeeksProgress = () => {
  const projectsWithGoals = useBudgetedProjects()

  return (
    <VStack gap={20}>
      <SectionTitle>
        Previous {pluralize(previousWeeksConfig.weeks, 'week')}
      </SectionTitle>
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
