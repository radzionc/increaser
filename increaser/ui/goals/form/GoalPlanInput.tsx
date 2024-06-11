import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { InputProps } from '@lib/ui/props'
import { getColor } from '@lib/ui/theme/getters'
import { ComponentProps, useLayoutEffect, useRef } from 'react'
import styled from 'styled-components'

const Container = styled.textarea`
  border: none;
  outline: none;
  overflow: hidden;
  resize: none;

  line-height: 1.5;

  background: ${getColor('background')};
  color: ${getColor('text')};

  &::placeholder {
    color: ${getColor('textShy')};
  }
`

type GoalPlanInputProps = InputProps<string> &
  Omit<ComponentProps<typeof Container>, 'value' | 'onChange'>

export const GoalPlanInput = ({
  value,
  onChange,
  ...rest
}: GoalPlanInputProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useLayoutEffect(() => {
    const element = textareaRef.current
    if (element) {
      element.style.minHeight = 'auto'
      element.style.minHeight = toSizeUnit(element.scrollHeight)
    }
  }, [value])

  return (
    <Container
      placeholder="How are you going to achieve this goal? What's your plan?"
      autoComplete="off"
      ref={textareaRef}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      rows={3}
      {...rest}
    />
  )
}
