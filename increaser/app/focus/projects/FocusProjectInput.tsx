import { useState } from 'react'
import styled from 'styled-components'
import { AddProject } from './AddProject'
import { useActiveProjects } from '@increaser/ui/projects/hooks/useActiveProjects'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { CurrentProjectProvider } from '@increaser/ui/projects/CurrentProjectProvider'
import { FocusProjectOption } from './FocusProjectOption'
import { EmojiTextPrefix } from '@lib/ui/text/EmojiTextPrefix'
import { useEffectOnDependencyChange } from '@lib/ui/hooks/useEffectOnDependencyChange'
import { BoxIcon } from '@lib/ui/icons/BoxIcon'
import { FocusEntityInputHeader } from '../launcher/FocusEntityInputHeader'
import { FocusEntityOptionsContainer } from '../launcher/FocusEntityOptionsContainer'
import { useFocusTarget } from '../state/useFocusTarget'

const Wrapper = styled.div`
  padding: 0;
`

export const FocusProjectInput = () => {
  const [isOpen, setIsOpen] = useState(false)
  const options = useActiveProjects()

  const [{ projectId }, setState] = useFocusTarget()
  const { projects, tasks } = useAssertUserState()

  useEffectOnDependencyChange(() => {
    setIsOpen(false)
  }, [projectId])

  return (
    <Wrapper>
      <FocusEntityInputHeader
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onRemove={() => {
          setState((state) => ({ ...state, projectId: null }))
        }}
        entityName="a project"
        value={projectId ? projects[projectId] : null}
        renderValue={(project) => (
          <>
            <EmojiTextPrefix emoji={project.emoji} />
            {project.name}
          </>
        )}
        icon={<BoxIcon />}
      />
      {isOpen && (
        <FocusEntityOptionsContainer>
          {options.map((project) => {
            const { id } = project
            return (
              <CurrentProjectProvider key={id} value={project}>
                <FocusProjectOption
                  onClick={() => {
                    setState((state) => ({
                      ...state,
                      projectId: id,
                      taskId: state.taskId
                        ? tasks[state.taskId].projectId === id
                          ? state.taskId
                          : null
                        : null,
                    }))
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
      )}
    </Wrapper>
  )
}
