import { Panel } from '@lib/ui/panel/Panel'
import { useBudgetedProjects } from './hooks/useBudgetedProjects'
import { ProjectBudgetWidget } from './ProjectBudgetWidget'
import { CurrentProjectProvider } from '../components/ProjectView/CurrentProjectProvider'
import { VStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import { useMemo } from 'react'
import { isEmpty } from '@lib/utils/array/isEmpty'
import { ShyInfoBlock } from '@lib/ui/info/ShyInfoBlock'

export const CurrentWeekProgress = () => {
  const projects = useBudgetedProjects()

  const projectsWithGoals = useMemo(
    () => projects.filter((project) => project.goal !== null),
    [projects],
  )

  return (
    <Panel>
      <VStack gap={20}>
        <Text color="contrast" weight="semibold">
          This week progress
        </Text>
        {isEmpty(projectsWithGoals) ? (
          <ShyInfoBlock>
            Set goals for your projects to track their progress
          </ShyInfoBlock>
        ) : (
          <VStack gap={40}>
            {projectsWithGoals.map((project) => (
              <CurrentProjectProvider value={project} key={project.id}>
                <ProjectBudgetWidget />
              </CurrentProjectProvider>
            ))}
          </VStack>
        )}
      </VStack>
    </Panel>
  )
}
