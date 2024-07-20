import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { FormSectionShyTitle } from '@lib/ui/form/components/FormSectionShyTitle'
import { VStack } from '@lib/ui/layout/Stack'
import { panelDefaultPadding } from '@lib/ui/panel/Panel'
import { InputProps } from '@lib/ui/props'
import { getColor } from '@lib/ui/theme/getters'
import { ComponentProps, ReactNode, useLayoutEffect, useRef } from 'react'
import styled from 'styled-components'

const Wrapper = styled(VStack)`
  padding: 0;
  position: relative;
  > * {
    padding: ${toSizeUnit(panelDefaultPadding)};

    &:last-child {
      padding-top: ${toSizeUnit(panelDefaultPadding + 24)};
    }
  }
`

const PositionLabel = styled.div`
  position: absolute;
  pointer-events: none;
`

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

type PanelDescriptionInputProps = InputProps<string> &
  Omit<ComponentProps<typeof Container>, 'value' | 'onChange'> & {
    label: ReactNode
  }

export const PanelDescriptionInput = ({
  value,
  onChange,
  label,
  ...rest
}: PanelDescriptionInputProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useLayoutEffect(() => {
    const element = textareaRef.current
    if (element) {
      element.style.minHeight = 'auto'
      element.style.minHeight = toSizeUnit(element.scrollHeight)
    }
  }, [value])

  return (
    <Wrapper>
      <PositionLabel>
        <FormSectionShyTitle>{label}</FormSectionShyTitle>
      </PositionLabel>
      <Container
        autoComplete="off"
        ref={textareaRef}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        {...rest}
      />
    </Wrapper>
  )
}
