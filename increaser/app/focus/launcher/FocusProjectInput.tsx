import { InvisibleHTMLRadio } from '@lib/ui/inputs/InvisibleHTMLRadio'
import { UniformColumnGrid } from '@lib/ui/Layout/UniformColumnGrid'
import { VStack } from '@lib/ui/layout/Stack'
import { AddProjectsPrompt } from '../../projects/components/AddProjectsPrompt'
import { useFocusLauncher } from './state/FocusLauncherContext'
import { useEffect } from 'react'
import { FocusOptionContainer } from './FocusOptionContainer'
import { otherProject } from '@increaser/entities/Project'
import { useActiveProjects } from '@increaser/ui/projects/hooks/useActiveProjects'
import { AddProject } from './AddProject'
import { FocusOptionContent } from './FocusOptionContent'
import { LabelText } from '@lib/ui/inputs/LabelText'
import { InputContainer } from '@lib/ui/inputs/InputContainer'

export const FocusProjectInput = () => {
  const { projectId, setState } = useFocusLauncher()
  const options = useActiveProjects()

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

  return (
    <InputContainer as="div">
      <LabelText>Select a project</LabelText>
      <VStack gap={20}>
        {options.every((option) => option.id === otherProject.id) && (
          <AddProjectsPrompt />
        )}
        <UniformColumnGrid gap={4} minChildrenWidth={160} rowHeight={52}>
          {options.map((project) => {
            const { id, name, emoji } = project
            const isSelected = id === projectId
            return (
              <FocusOptionContainer as="label" key={id} selected={isSelected}>
                <FocusOptionContent prefix={emoji}>{name}</FocusOptionContent>
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
              </FocusOptionContainer>
            )
          })}
          <AddProject />
        </UniformColumnGrid>
      </VStack>
    </InputContainer>
  )
}
