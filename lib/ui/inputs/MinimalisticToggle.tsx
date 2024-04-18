import { HStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import styled from 'styled-components'
import { round } from '@lib/ui/css/round'
import { getColor } from '@lib/ui/theme/getters'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { centerContent } from '@lib/ui/css/centerContent'
import { transition } from '@lib/ui/css/transition'
import { InputProps, LabeledComponentProps, UIComponentProps } from '../props'
import { verticalPadding } from '../css/verticalPadding'
import { InvisibleHTMLCheckbox } from './InvisibleHTMLCheckbox'
import { interactive } from '../css/interactive'

const CheckContainer = styled.div`
  ${round};
  border: 2px solid ${getColor('textShy')};
  ${sameDimensions(20)};
  padding: 1px;
  ${centerContent}
  ${transition};
`

const Container = styled.label`
  ${transition};
  ${verticalPadding(4)}
  ${interactive};
  position: relative;
  &:hover {
    color: ${getColor('contrast')};
  }

  &:hover ${CheckContainer} {
    background: ${getColor('mist')};
  }
`

const Check = styled.div`
  ${round};
  background: ${getColor('primary')};
  ${sameDimensions('100%')};
  ${centerContent}
`

type MinimalisticToggleProps = InputProps<boolean> &
  LabeledComponentProps &
  UIComponentProps

export const MinimalisticToggle = ({
  value,
  onChange,
  label,
  ...rest
}: MinimalisticToggleProps) => {
  return (
    <Container {...rest}>
      <HStack alignItems="center" gap={8}>
        <CheckContainer>{value && <Check />}</CheckContainer>
        <Text as="div">{label}</Text>
      </HStack>
      <InvisibleHTMLCheckbox value={value} onChange={onChange} />
    </Container>
  )
}
