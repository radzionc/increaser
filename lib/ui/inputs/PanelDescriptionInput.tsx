import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { FormSectionShyTitle } from '@lib/ui/form/components/FormSectionShyTitle'
import { VStack } from '@lib/ui/layout/Stack'
import { panelDefaultPadding } from '@lib/ui/panel/Panel'
import { InputProps } from '@lib/ui/props'
import { ComponentProps, ReactNode, useLayoutEffect, useRef } from 'react'
import styled from 'styled-components'
import { MultilineTextInput } from './MultilineTextInput'
import { tightListItemConfig } from '../list/tightListItemConfig'

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

const Container = styled(MultilineTextInput)`
  line-height: ${toSizeUnit(tightListItemConfig.lineHeight)};
  background: transparent;
  width: 100%;
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
        onChange={onChange}
        {...rest}
      />
    </Wrapper>
  )
}
