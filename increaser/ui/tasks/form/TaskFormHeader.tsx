import { panelDefaultPadding } from '@lib/ui/css/panel'
import { HStack, VStack } from '@lib/ui/css/stack'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { EmbeddedTitleInput } from '@lib/ui/inputs/EmbeddedTitleInput'
import { MultilineTextInput } from '@lib/ui/inputs/MultilineTextInput'
import { ClosableComponentProps, InputProps } from '@lib/ui/props'
import { getColor } from '@lib/ui/theme/getters'
import styled from 'styled-components'
import { TaskProjectSelector } from '../TaskProjectSelector'
import { useRef } from 'react'
import { TaskChecklistItem, TaskLink } from '@increaser/entities/Task'
import { NonEmptyOnly } from '@lib/ui/base/NonEmptyOnly'
import { TaskLinkItem } from './links/TaskLinkItem'
import { updateAtIndex } from '@lib/utils/array/updateAtIndex'
import { removeAtIndex } from '@lib/utils/array/removeAtIndex'
import { TaskChecklistInput } from './checklist/TaskChecklistInput'
import { CloseButton } from '@lib/ui/buttons/CloseButton'
import { sameDimensions } from '@lib/ui/css/sameDimensions'

type TaskFormHeaderValue = {
  projectId: string
  name: string
  description: string
  links: TaskLink[]
  checklist: TaskChecklistItem[]
}

type TaskFormHeaderProps = InputProps<TaskFormHeaderValue> &
  Partial<ClosableComponentProps> & {
    onSubmit?: () => void
    hasProjectAutoFocus?: boolean
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

const headerOffset = 8

const ProjectInputContainer = styled.div`
  padding-left: ${toSizeUnit(headerOffset)};
  padding-top: ${toSizeUnit(headerOffset)};
`

const CloseButtonContainer = styled.div`
  padding-right: ${toSizeUnit(headerOffset)};
  padding-top: ${toSizeUnit(headerOffset)};
`

const TitleInput = styled(EmbeddedTitleInput)`
  background: ${getColor('background')};

  padding: ${toSizeUnit(panelDefaultPadding)};
  padding-left: ${toSizeUnit(panelDefaultPadding / 2)};
  min-height: 100%;
  padding-bottom: ${toSizeUnit(headerOffset)};
`

const DescriptionInput = styled(MultilineTextInput)`
  background: ${getColor('background')};
  padding: ${toSizeUnit(panelDefaultPadding)};
  padding-top: ${toSizeUnit(panelDefaultPadding / 2)};
  min-height: 60px;
  line-height: 1.5;
`

const Close = styled(CloseButton)`
  ${sameDimensions(52)};
  font-size: 20px;
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

export const TaskFormHeader = ({
  value,
  onChange,
  onSubmit,
  hasProjectAutoFocus = false,
  onClose,
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
          placeholder="Task name"
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

        {onClose && (
          <CloseButtonContainer>
            <Close kind="secondary" size="l" onClick={onClose} />
          </CloseButtonContainer>
        )}
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
    </Container>
  )
}
