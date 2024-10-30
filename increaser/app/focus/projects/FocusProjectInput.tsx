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

const Wrapper = styled.div`
  padding: 0;
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
      )}
    </Wrapper>
  )
}
