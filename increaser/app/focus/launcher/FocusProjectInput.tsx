import styled from 'styled-components'
import { Center } from '@lib/ui/layout/Center'
import { InvisibleHTMLRadio } from '@lib/ui/inputs/InvisibleHTMLRadio'
import { UniformColumnGrid } from '@lib/ui/Layout/UniformColumnGrid'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import { ProjectGoalBadge } from './ProjectGoalBadge'
import { CurrentProjectProvider } from '@increaser/ui/projects/CurrentProjectProvider'
import { AddProjectsPrompt } from '../../projects/components/AddProjectsPrompt'
import { useFocusLauncher } from './state/FocusLauncherContext'
import { useProjects } from '@increaser/ui/projects/ProjectsProvider'
import { useEffect, useMemo } from 'react'
import { splitBy } from '@lib/utils/array/splitBy'
import { order } from '@lib/utils/array/order'
import { FocusOptionContainer } from './FocusOptionContainer'
import { otherProject } from '@increaser/entities/Project'

const Identifier = styled(Center)`
  width: 16px;
  font-size: 14px;
`

const Option = styled(FocusOptionContainer)`
  height: 52px;
`

export const FocusProjectInput = () => {
  const { projectId, setState } = useFocusLauncher()
  const { activeProjects } = useProjects()

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

    return [
      ...order(
        doMoreProjects,
        (project) =>
          project.doneMinutesThisWeek / project.allocatedMinutesPerWeek,
        'asc',
      ),
      ...projectsWithoutGoal,
      ...order(
        doLessProjects,
        (project) =>
          project.doneMinutesThisWeek / project.allocatedMinutesPerWeek,
        'asc',
      ),
      ...projectsWithoutBudget,
    ]
  }, [activeProjects])

  useEffect(() => {
    const project = options.find((option) => option.id === projectId)
    if (!project && options.length) {
      setState((state) => ({
        ...state,
        projectId: options[0].id,
        taskId: null,
      }))
    }
  }, [options, projectId, setState])

  if (!options.length) {
    return <AddProjectsPrompt />
  }

  return (
    <VStack gap={20}>
      {options.every((option) => option.id === otherProject.id) && (
        <AddProjectsPrompt />
      )}
      <UniformColumnGrid gap={4} minChildrenWidth={160}>
        {options.map((project) => {
          const { id, name } = project
          const isSelected = id === projectId
          return (
            <Option as="label" key={id} selected={isSelected}>
              <HStack style={{ maxWidth: '100%' }} alignItems="center" gap={8}>
                <Identifier>
                  <CurrentProjectProvider value={project}>
                    <ProjectGoalBadge project={project} />
                  </CurrentProjectProvider>
                </Identifier>
                <Text cropped>{name}</Text>
              </HStack>
              <InvisibleHTMLRadio
                isSelected={isSelected}
                value={id}
                groupName="project"
                onSelect={() =>
                  setState((state) => ({
                    ...state,
                    projectId: id,
                    taskId: null,
                  }))
                }
              />
            </Option>
          )
        })}
      </UniformColumnGrid>
    </VStack>
  )
}
