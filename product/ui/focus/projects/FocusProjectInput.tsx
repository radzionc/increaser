import { cropText } from '@lib/ui/css/cropText'
import { Panel } from '@lib/ui/css/panel'
import { hStack, vStack } from '@lib/ui/css/stack'
import { useRunOnChange } from '@lib/ui/hooks/useRunOnChange'
import { BoxIcon } from '@lib/ui/icons/BoxIcon'
import { FocusProjectBudget } from '@product/ui/focus/launcher/FocusProjectBudget'
import { ProjectBudgetTag } from '@product/ui/projects/budget/ProjectBudgetTag'
import { CurrentProjectProvider } from '@product/ui/projects/CurrentProjectProvider'
import { useActiveProjects } from '@product/ui/projects/hooks/useActiveProjects'
import { useUser } from '@product/ui/user/state/user'
import { useState } from 'react'
import styled from 'styled-components'

import { FocusEntityInputHeader } from '../launcher/focusEntity/FocusEntityInputHeader'
import { FocusEntityOptionsContainer } from '../launcher/focusEntity/FocusEntityOptionsContainer'
import { FocusLauncherField } from '../launcher/FocusLauncherField'
import { useFocusProject } from '../state/focusProject'

import { AddProject } from './AddProject'
import { FocusProjectOption } from './FocusProjectOption'
import { FocusProjectOptionContent } from './FocusProjectOptionContent'
import { getProjectShortcuts } from './getProjectShortcuts'

const Wrapper = styled.div`
  padding: 0;

  ${vStack()};
`

const Content = styled.div`
  ${hStack({
    fullWidth: true,
    alignItems: 'center',
    justifyContent: 'space-between',
  })};
  ${cropText};
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
    <FocusLauncherField label="Focus project">
      <Panel kind="secondary" withSections>
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
                <Content>
                  <FocusProjectOptionContent
                    emoji={project.emoji}
                    name={project.name}
                  />
                  <ProjectBudgetTag />
                </Content>
              </CurrentProjectProvider>
            )}
            icon={<BoxIcon />}
          />
          {isOpen ? (
            <FocusEntityOptionsContainer>
              {(() => {
                const shortcuts = getProjectShortcuts(options)
                return options.map((project) => {
                  const { id, name } = project
                  const letter = name[0]?.toLowerCase()
                  const shortcut =
                    shortcuts.get(letter) === id ? letter : undefined
                  return (
                    <CurrentProjectProvider key={id} value={project}>
                      <FocusProjectOption
                        onClick={() => {
                          setProjectId(id)
                        }}
                        shortcut={shortcut}
                      />
                    </CurrentProjectProvider>
                  )
                })
              })()}
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
      </Panel>
    </FocusLauncherField>
  )
}
