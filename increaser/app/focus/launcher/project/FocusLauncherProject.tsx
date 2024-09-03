import { useState } from 'react'
import { useFocusLauncher } from '../state/useFocusLauncher'
import styled from 'styled-components'
import { VStack } from '@lib/ui/css/stack'
import { uniformColumnGrid } from '@lib/ui/css/uniformColumnGrid'
import { AddProject } from './AddProject'
import { useActiveProjects } from '@increaser/ui/projects/hooks/useActiveProjects'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { panelDefaultPadding } from '@lib/ui/css/panel'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { CurrentProjectProvider } from '@increaser/ui/projects/CurrentProjectProvider'
import { FocusProjectOption } from './FocusProjectOption'
import { FocusEntityInputHeader } from '../FocusEntityInputHeader'
import { EmojiTextPrefix } from '@lib/ui/text/EmojiTextPrefix'
import { useEffectOnDependencyChange } from '@lib/ui/hooks/useEffectOnDependencyChange'
import { BoxIcon } from '@lib/ui/icons/BoxIcon'

const Wrapper = styled.div`
  padding: 0;
`

const Content = styled(VStack)`
  padding: ${toSizeUnit(panelDefaultPadding)};
  padding-top: 4px;

  ${uniformColumnGrid({
    gap: 20,
    minChildrenWidth: 160,
    rowHeight: 40,
  })}

  grid-row-gap:4px;
  overflow: visible;
`

export const FocusLauncherProject = () => {
  const [isOpen, setIsOpen] = useState(false)
  const options = useActiveProjects()

  const [{ projectId }, setState] = useFocusLauncher()
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
        <Content>
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
        </Content>
      )}
    </Wrapper>
  )
}
