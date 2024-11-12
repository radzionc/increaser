import { useState } from 'react'
import styled from 'styled-components'
import { AddProject } from './AddProject'
import { useActiveProjects } from '@increaser/ui/projects/hooks/useActiveProjects'
import { useUser } from '@increaser/ui/user/state/user'
import { CurrentProjectProvider } from '@increaser/ui/projects/CurrentProjectProvider'
import { FocusProjectOption } from './FocusProjectOption'
import { EmojiTextPrefix } from '@lib/ui/text/EmojiTextPrefix'
import { BoxIcon } from '@lib/ui/icons/BoxIcon'
import { FocusEntityInputHeader } from '../launcher/FocusEntityInputHeader'
import { FocusEntityOptionsContainer } from '../launcher/FocusEntityOptionsContainer'
import { useRunOnChange } from '@lib/ui/hooks/useRunOnChange'
import { useFocusProject } from '../state/focusProject'
import { HStack, vStack } from '@lib/ui/css/stack'
import { ProjectBudgetTag } from '@increaser/ui/projects/budget/ProjectBudgetTag'
import { FocusProjectBudget } from '../launcher/FocusProjectBudget'

const Wrapper = styled.div`
  padding: 0;

  ${vStack()};
`

export const FocusProjectInput = () => {
  const [isOpen, setIsOpen] = useState(false)
  const options = useActiveProjects()

  const { projects } = useUser()

  const [projectId, setProjectId] = useFocusProject()

  useRunOnChange(() => {
    setIsOpen(false)
  }, [projectId])

  return (
    <Wrapper>
      <FocusEntityInputHeader
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onRemove={() => {
          setProjectId(null)
        }}
        entityName="a project"
        value={projectId ? projects[projectId] : null}
        renderValue={(project) => (
          <CurrentProjectProvider key={project.id} value={project}>
            <HStack
              fullWidth
              alignItems="center"
              justifyContent="space-between"
            >
              <HStack alignItems="center" gap={8}>
                <EmojiTextPrefix emoji={project.emoji} />
                {project.name}
              </HStack>
              <ProjectBudgetTag />
            </HStack>
          </CurrentProjectProvider>
        )}
        icon={<BoxIcon />}
      />
      {isOpen ? (
        <FocusEntityOptionsContainer>
          {options.map((project) => {
            const { id } = project
            return (
              <CurrentProjectProvider key={id} value={project}>
                <FocusProjectOption
                  onClick={() => {
                    setProjectId(id)
                  }}
                />
              </CurrentProjectProvider>
            )
          })}
          <AddProject
            onFinish={() => {
              setIsOpen(false)
            }}
          />
        </FocusEntityOptionsContainer>
      ) : (
        <FocusProjectBudget />
      )}
    </Wrapper>
  )
}
