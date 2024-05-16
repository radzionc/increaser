import styled from 'styled-components'
import { Center } from '@lib/ui/layout/Center'
import { InvisibleHTMLRadio } from '@lib/ui/inputs/InvisibleHTMLRadio'
import { UniformColumnGrid } from '@lib/ui/Layout/UniformColumnGrid'
import { HStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import { ProjectGoalBadge } from './ProjectGoalBadge'
import { CurrentProjectProvider } from '@increaser/ui/projects/CurrentProjectProvider'
import { AddProjectsPrompt } from '../../projects/components/AddProjectsPrompt'
import { useFocusLauncher } from './state/FocusLauncherContext'
import { useEffect, useMemo } from 'react'
import { splitBy } from '@lib/utils/array/splitBy'
import { order } from '@lib/utils/array/order'
import { FocusOptionContainer } from './FocusOptionContainer'
import { useActiveProjects } from '@increaser/ui/projects/hooks/useActiveProjects'
import { useCurrentWeekSets } from '@increaser/ui/sets/hooks/useCurrentWeekSets'
import { getProjectDoneMinutes } from '@increaser/ui/projects/utils/getProjectDoneMinutes'
import { getProjectName } from '@increaser/ui/projects/utils/getProjectName'

const Identifier = styled(Center)`
  width: 16px;
  font-size: 14px;
`

const Option = styled(FocusOptionContainer)`
  height: 52px;
`

export const FocusProjectInput = () => {
  const { projectId, setState } = useFocusLauncher()
  const activeProjects = useActiveProjects()
  const sets = useCurrentWeekSets()

  const options = useMemo(() => {
    const [projectsWithBudget, projectsWithoutBudget] = splitBy(
      activeProjects,
      (project) => (project.allocatedMinutesPerWeek ? 0 : 1),
    )

    const [projectsWithGoal, projectsWithoutGoal] = splitBy(
      projectsWithBudget,
      (project) => (project.goal ? 0 : 1),
    )

    const [doMoreProjects, doLessProjects] = splitBy(
      projectsWithGoal,
      (project) => (project.goal === 'doMore' ? 0 : 1),
    )

    const projectIds = [
      ...order(
        doMoreProjects,
        (project) =>
          getProjectDoneMinutes({
            sets,
            id: project.id,
          }) / project.allocatedMinutesPerWeek,
        'asc',
      ),
      ...projectsWithoutGoal,
      ...order(
        doLessProjects,
        (project) =>
          getProjectDoneMinutes({
            sets,
            id: project.id,
          }) / project.allocatedMinutesPerWeek,
        'asc',
      ),
      ...projectsWithoutBudget,
    ].map((project) => project.id)

    return [...projectIds, null]
  }, [activeProjects, sets])

  useEffect(() => {
    if (projectId === undefined) {
      setState((state) => ({ ...state, projectId: options[0] }))
    }
  }, [options, projectId, setState])

  if (!options.length) {
    return <AddProjectsPrompt />
  }

  return (
    <UniformColumnGrid gap={4} minChildrenWidth={160}>
      {options.map((id, index) => {
        const isSelected = id === projectId
        return (
          <Option as="label" key={id} selected={isSelected}>
            <HStack style={{ maxWidth: '100%' }} alignItems="center" gap={8}>
              <Identifier>
                <CurrentProjectProvider value={id}>
                  <ProjectGoalBadge />
                </CurrentProjectProvider>
              </Identifier>
              <Text cropped>
                {getProjectName({
                  id,
                  projects: activeProjects,
                })}
              </Text>
            </HStack>
            <InvisibleHTMLRadio
              isSelected={isSelected}
              value={index}
              groupName="project"
              onSelect={() =>
                setState((state) => ({ ...state, projectId: options[index] }))
              }
            />
          </Option>
        )
      })}
    </UniformColumnGrid>
  )
}
