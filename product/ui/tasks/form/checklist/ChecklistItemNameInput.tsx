import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { CursorPosition } from '@lib/ui/entities/CursorPosition'
import { MultilineTextInput } from '@lib/ui/inputs/MultilineTextInput'
import { tightListItemConfig } from '@lib/ui/list/tightListItemConfig'
import { InputProps } from '@lib/ui/props'
import { getColor } from '@lib/ui/theme/getters'
import { ComponentProps, useRef } from 'react'
import styled from 'styled-components'

const Container = styled(MultilineTextInput)`
  line-height: ${toSizeUnit(tightListItemConfig.lineHeight)};
  background: ${getColor('background')};
  width: 100%;
`

type ChecklistItemNameInputProps = InputProps<string> &
  Omit<ComponentProps<typeof Container>, 'value' | 'onChange' | 'onSubmit'> & {
    onSubmit?: (cursorPosition: CursorPosition) => void
    onRemove?: () => void
  }

export const ChecklistItemNameInput = ({
  value,
  onChange,
  onSubmit,
  onRemove,
  ...rest
}: ChecklistItemNameInputProps) => {
  const inputRef = useRef<HTMLTextAreaElement | null>(null)

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      const cursorPosition: CursorPosition = inputRef.current
        ? inputRef.current.selectionStart === 0
          ? 'start'
          : inputRef.current.selectionStart === value.length
            ? 'end'
            : 'middle'
        : 'end'
      onSubmit?.(cursorPosition)
    } else if (event.key === 'Backspace' && !value) {
      onRemove?.()
    }
  }

  return (
    <Container
      ref={inputRef}
      value={value}
      onChange={onChange}
      placeholder="Task name"
      autoComplete="off"
      autoFocus={!value}
      onKeyDown={handleKeyDown}
      {...rest}
    />
  )
}
