import { InputProps } from '@lib/ui/props'
import { ComponentProps, useEffect, useRef } from 'react'
import styled from 'styled-components'

const Container = styled.textarea`
  background: transparent;
  border: none;
  height: 100%;
  margin: 0;
  width: 100%;
  outline: none;
  color: ${({ theme }) => theme.colors.text.toCssValue()};

  &::placeholder {
    color: ${({ theme }) => theme.colors.textShy.toCssValue()};
  }

  overflow: hidden;
  resize: none;
`

type TaskNameInputProps = InputProps<string> &
  Omit<ComponentProps<typeof Container>, 'value' | 'onChange'> & {
    onSubmit?: () => void
  }

export const TaskNameInput = ({
  value,
  onChange,
  onSubmit,
  ...rest
}: TaskNameInputProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const resizeTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Prevent default only if Enter is pressed and the Shift key is not held
    // (assuming you might want Shift+Enter for form submission or other actions)
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      onSubmit?.()
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value)
    resizeTextarea()
  }

  useEffect(() => {
    resizeTextarea()
  }, [value]) // Update effect dependency to resize on value change

  return (
    <Container
      autoComplete="off"
      ref={textareaRef}
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      rows={1}
      {...rest}
    />
  )
}
