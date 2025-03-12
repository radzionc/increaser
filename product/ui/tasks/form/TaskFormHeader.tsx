import { NonEmptyOnly } from '@lib/ui/base/NonEmptyOnly'
import { panelDefaultPadding } from '@lib/ui/css/panel'
import { HStack, VStack } from '@lib/ui/css/stack'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { EmbeddedTitleInput } from '@lib/ui/inputs/EmbeddedTitleInput'
import { MultilineTextInput } from '@lib/ui/inputs/MultilineTextInput'
import { tightListItemConfig } from '@lib/ui/list/tightListItemConfig'
import { OnCloseProp, InputProps } from '@lib/ui/props'
import { getColor } from '@lib/ui/theme/getters'
import { isEmpty } from '@lib/utils/array/isEmpty'
import { removeAtIndex } from '@lib/utils/array/removeAtIndex'
import { updateAtIndex } from '@lib/utils/array/updateAtIndex'
import { ProjectRelatedEntity } from '@product/entities/Project'
import { TaskChecklistItem, TaskLink } from '@product/entities/Task'
import { useRef } from 'react'
import styled from 'styled-components'

import { panelFormConfig } from '../../form/panel/config'
import { PanelFormCloseButton } from '../../form/panel/PanelFormCloseButton'
import { TaskTemplatesWidget } from '../../taskTemplates/widget/TaskTemplatesWidget'
import { TaskProjectSelector } from '../TaskProjectSelector'

import { AddTaskChecklist } from './checklist/AddTaskChecklist'
import { TaskChecklistInput } from './checklist/TaskChecklistInput'
import { AddTaskLink } from './links/AddTaskLink'
import { TaskLinkItem } from './links/TaskLinkItem'

type TaskFormHeaderValue = ProjectRelatedEntity & {
  name: string
  description: string
  links: TaskLink[]
  checklist: TaskChecklistItem[]
}

type TaskFormHeaderProps = InputProps<TaskFormHeaderValue> &
  Partial<OnCloseProp> & {
    onSubmit?: () => void
    hasProjectAutoFocus?: boolean
    titlePlaceholder?: string
  }

const Container = styled(VStack)`
  padding: 0;
  width: 100%;
  flex: 1;
  overflow-y: auto;

  > * {
    flex-shrink: 0;
  }
`

const Header = styled(HStack)`
  padding: 0;
  width: 100%;
`

const ProjectInputContainer = styled.div`
  padding-left: ${toSizeUnit(tightListItemConfig.horizontalOffset)};
  padding-top: ${toSizeUnit(tightListItemConfig.horizontalOffset)};
`

const TitleInput = styled(EmbeddedTitleInput)`
  background: ${getColor('background')};

  padding: ${toSizeUnit(panelDefaultPadding)};
  padding-left: ${toSizeUnit(panelDefaultPadding / 2)};
  min-height: 100%;
  padding-bottom: ${toSizeUnit(tightListItemConfig.horizontalOffset)};
`

const DescriptionInput = styled(MultilineTextInput)`
  background: ${getColor('background')};
  padding: ${toSizeUnit(panelDefaultPadding)};
  padding-top: ${toSizeUnit(panelDefaultPadding / 2)};
  min-height: ${toSizeUnit(panelFormConfig.sectionMinHeight)};
  line-height: 1.5;
`

const LinksContainer = styled(HStack)`
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  padding: ${toSizeUnit(panelDefaultPadding)};
  padding-top: 0;
`

const ChecklistContainer = styled(VStack)`
  padding: ${toSizeUnit(panelDefaultPadding)};
  padding-top: 0;
`

const Actions = styled(HStack)`
  padding: ${toSizeUnit(panelDefaultPadding)};
  padding-top: 0;
`

export const TaskFormHeader = ({
  value,
  onChange,
  onSubmit,
  hasProjectAutoFocus = false,
  onClose,
  titlePlaceholder = 'Task name',
}: TaskFormHeaderProps) => {
  const nameInputRef = useRef<HTMLTextAreaElement | null>(null)

  return (
    <Container>
      <Header>
        <ProjectInputContainer>
          <TaskProjectSelector
            autoFocus={hasProjectAutoFocus}
            value={value.projectId}
            onChange={(projectId) => {
              onChange({
                ...value,
                projectId,
              })
              nameInputRef.current?.focus()
            }}
          />
        </ProjectInputContainer>

        <TitleInput
          placeholder={titlePlaceholder}
          autoFocus={!hasProjectAutoFocus && !value.name}
          value={value.name}
          ref={nameInputRef}
          onChange={(name) => {
            onChange({
              ...value,
              name,
            })
          }}
          onSubmit={onSubmit}
        />

        {onClose && <PanelFormCloseButton onClick={onClose} />}
      </Header>
      <DescriptionInput
        placeholder="Add a description..."
        onChange={(description) => onChange({ ...value, description })}
        value={value.description}
      />
      <NonEmptyOnly
        value={value.links}
        render={(links) => (
          <LinksContainer>
            {links.map((link, index) => (
              <TaskLinkItem
                key={index}
                value={link}
                onRemove={() =>
                  onChange({
                    ...value,
                    links: removeAtIndex(value.links, index),
                  })
                }
                onChange={(newValue) =>
                  onChange({
                    ...value,
                    links: updateAtIndex(value.links, index, () => newValue),
                  })
                }
              />
            ))}
          </LinksContainer>
        )}
      />
      <NonEmptyOnly
        value={value.checklist}
        render={(checklist) => (
          <ChecklistContainer>
            <TaskChecklistInput
              value={checklist}
              onChange={(checklist) => onChange({ ...value, checklist })}
            />
          </ChecklistContainer>
        )}
      />
      <Actions gap={8}>
        <TaskTemplatesWidget
          onChange={(template) => onChange({ ...value, ...template })}
          value={value}
        />

        <AddTaskLink
          onFinish={(link) =>
            onChange({ ...value, links: [...value.links, link] })
          }
        />

        {isEmpty(value.checklist) && (
          <AddTaskChecklist
            onFinish={(checklist) => onChange({ ...value, checklist })}
          />
        )}
      </Actions>
    </Container>
  )
}
