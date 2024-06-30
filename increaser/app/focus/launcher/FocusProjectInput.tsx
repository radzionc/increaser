import styled from 'styled-components'
import { InvisibleHTMLRadio } from '@lib/ui/inputs/InvisibleHTMLRadio'
import { UniformColumnGrid } from '@lib/ui/Layout/UniformColumnGrid'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import { AddProjectsPrompt } from '../../projects/components/AddProjectsPrompt'
import { useFocusLauncher } from './state/FocusLauncherContext'
import { useEffect } from 'react'
import { FocusOptionContainer } from './FocusOptionContainer'
import { otherProject } from '@increaser/entities/Project'
import { useActiveProjects } from '@increaser/ui/projects/hooks/useActiveProjects'
import { EmojiTextPrefix } from '@lib/ui/text/EmojiTextPrefix'

const Option = styled(FocusOptionContainer)`
  height: 52px;
`

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
          const { id, name, emoji } = project
          const isSelected = id === projectId
          return (
            <Option as="label" key={id} selected={isSelected}>
              <HStack style={{ maxWidth: '100%' }} alignItems="center" gap={8}>
                <Text cropped>
                  <EmojiTextPrefix emoji={emoji} />
                  {name}
                </Text>
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
