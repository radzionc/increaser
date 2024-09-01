import { useState } from 'react'
import { useFocusLauncher } from '../state/useFocusLauncher'
import styled from 'styled-components'
import { VStack } from '@lib/ui/layout/Stack'
import { uniformColumnGrid } from '@lib/ui/css/uniformColumnGrid'
import { InvisibleHTMLRadio } from '@lib/ui/inputs/InvisibleHTMLRadio'
import { AddProject } from '../AddProject'
import { FocusOptionContainer } from '../FocusOptionContainer'
import { FocusOptionContent } from '../FocusOptionContent'
import { useActiveProjects } from '@increaser/ui/projects/hooks/useActiveProjects'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { FocusLauncherHeader } from './FocusLauncherHeader'
import { panelDefaultPadding } from '@lib/ui/panel/Panel'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { focusLauncherConfig } from '../config'
import { tightListItemMinHeight } from '@lib/ui/list/tightListItemConfig'

const Wrapper = styled.div`
  padding: 0;
`

const paddingTop =
  panelDefaultPadding -
  (focusLauncherConfig.sectionMinHeight - tightListItemMinHeight) / 2

const Content = styled(VStack)`
  padding: ${toSizeUnit(panelDefaultPadding)};
  padding-top: ${toSizeUnit(paddingTop)};

  ${uniformColumnGrid({
    gap: 4,
    minChildrenWidth: 160,
    rowHeight: 40,
  })}
`

export const FocusLauncherProject = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [{ projectId }, setState] = useFocusLauncher()
  const options = useActiveProjects()
  const { tasks } = useAssertUserState()

  return (
    <Wrapper>
      <FocusLauncherHeader value={isOpen} onChange={setIsOpen} />
      {isOpen && (
        <Content>
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
                  onSelect={() => {
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
              </FocusOptionContainer>
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
