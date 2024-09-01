import { useState } from 'react'
import { useFocusLauncher } from '../state/useFocusLauncher'
import styled from 'styled-components'
import { VStack } from '@lib/ui/layout/Stack'
import { uniformColumnGrid } from '@lib/ui/css/uniformColumnGrid'
import { AddProject } from './AddProject'
import { useActiveProjects } from '@increaser/ui/projects/hooks/useActiveProjects'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { FocusLauncherHeader } from './FocusLauncherHeader'
import { panelDefaultPadding } from '@lib/ui/panel/Panel'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { CurrentProjectProvider } from '@increaser/ui/projects/CurrentProjectProvider'
import { FocusProjectOption } from './FocusProjectOption'

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
  const [, setState] = useFocusLauncher()
  const options = useActiveProjects()
  const { tasks } = useAssertUserState()

  return (
    <Wrapper>
      <FocusLauncherHeader value={isOpen} onChange={setIsOpen} />
      {isOpen && (
        <Content>
          {options.map((project) => {
            const { id } = project
            return (
              <CurrentProjectProvider key={id} value={project}>
                <FocusProjectOption
                  onClick={() => {
                    setIsOpen(false)
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
