import { panelDefaultPadding } from '@lib/ui/css/panel'
import { HStack, VStack } from '@lib/ui/css/stack'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { EmbeddedTitleInput } from '@lib/ui/inputs/EmbeddedTitleInput'
import { MultilineTextInput } from '@lib/ui/inputs/MultilineTextInput'
import { InputProps } from '@lib/ui/props'
import { getColor } from '@lib/ui/theme/getters'
import styled from 'styled-components'
import { TaskProjectSelector } from '../TaskProjectSelector'
import { useRef } from 'react'

type TaskFormHeaderValue = {
  projectId: string
  name: string
  description: string
}

type TaskFormHeaderProps = InputProps<TaskFormHeaderValue> & {
  onSubmit?: () => void
  hasProjectAutoFocus?: boolean
}

const Container = styled(VStack)`
  padding: 0;
  width: 100%;
`

const Header = styled(HStack)`
  padding: 0;

  width: 100%;

  > * {
    &:first-child {
      padding-left: 8px;
      padding-top: 8px;
    }
    &:last-child {
      padding: ${toSizeUnit(panelDefaultPadding)};
      padding-left: ${toSizeUnit(panelDefaultPadding / 2)};
      min-height: 100%;
      padding-bottom: 8px;
    }
  }
`

const TitleInput = styled(EmbeddedTitleInput)`
  background: ${getColor('background')};
`

const DescriptionInput = styled(MultilineTextInput)`
  background: ${getColor('background')};
  padding: ${toSizeUnit(panelDefaultPadding)};
  padding-top: ${toSizeUnit(panelDefaultPadding / 2)};
  min-height: 60px;
`

export const TaskFormHeader = ({
  value,
  onChange,
  onSubmit,
  hasProjectAutoFocus = false,
}: TaskFormHeaderProps) => {
  const nameInputRef = useRef<HTMLTextAreaElement | null>(null)

  return (
    <Container>
      <Header>
        <div>
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
        </div>

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
      </Header>
      <DescriptionInput
        placeholder="Add description..."
        onChange={(description) => onChange({ ...value, description })}
        value={value.description}
      />
    </Container>
  )
}
