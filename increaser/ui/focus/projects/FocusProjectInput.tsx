import { useState } from 'react'
import styled from 'styled-components'
import { AddProject } from './AddProject'
import { useActiveProjects } from '@increaser/ui/projects/hooks/useActiveProjects'
import { useUser } from '@increaser/ui/user/state/user'
import { CurrentProjectProvider } from '@increaser/ui/projects/CurrentProjectProvider'
import { FocusProjectOption } from './FocusProjectOption'
import { BoxIcon } from '@lib/ui/icons/BoxIcon'
import { FocusEntityOptionsContainer } from '../launcher/focusEntity/FocusEntityOptionsContainer'
import { useRunOnChange } from '@lib/ui/hooks/useRunOnChange'
import { useFocusProject } from '../state/focusProject'
import { hStack, vStack } from '@lib/ui/css/stack'
import { ProjectBudgetTag } from '@increaser/ui/projects/budget/ProjectBudgetTag'
import { FocusProjectBudget } from '@increaser/ui/focus/launcher/FocusProjectBudget'
import { FocusProjectOptionContent } from './FocusProjectOptionContent'
import { cropText } from '@lib/ui/css/cropText'
import { FocusEntityInputHeader } from '../launcher/focusEntity/FocusEntityInputHeader'
import { FocusLauncherField } from '../launcher/FocusLauncherField'
import { Panel } from '@lib/ui/css/panel'

const Wrapper = styled.div`
  padding: 0;

  ${vStack()};
`

const Content = styled.p`
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
      </Panel>
    </FocusLauncherField>
  )
}
