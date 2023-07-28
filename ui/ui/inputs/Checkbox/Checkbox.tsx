import { ReactNode } from 'react'
import styled, { css } from 'styled-components'
import { HStack } from '../../Stack'
import { defaultTransitionCSS } from '../../animations/transitions'
import { CheckIcon } from '../../icons/CheckIcon'
import { getColor } from '../../theme/getters'
import { centerContentCSS } from '../../utils/centerContentCSS'
import { getSameDimensionsCSS } from '../../utils/getSameDimensionsCSS'
import {
  InvisibleHTMLCheckboxProps,
  InvisibleHTMLCheckbox,
} from './InvisibleHTMLCheckbox'
import { Text } from '../../Text'

interface CheckboxProps extends InvisibleHTMLCheckboxProps {
  label?: ReactNode
  className?: string
}

const Box = styled.div<{ isChecked: boolean }>`
  ${getSameDimensionsCSS(28)}
  ${centerContentCSS};
  border-radius: 4px;
  border: 2px solid ${getColor('text')};
  color: ${getColor('background')};

  ${defaultTransitionCSS}

  ${({ isChecked }) =>
    isChecked &&
    css`
      background: ${getColor('text')};
    `};
`

const Container = styled(HStack)`
  color: ${getColor('textSupporting')};

  cursor: pointer;

  ${defaultTransitionCSS}

  :hover {
    color: ${getColor('text')};
  }

  font-weight: 500;

  :hover ${Box} {
    transform: scale(1.1);
  }
`

export const Checkbox = ({
  value,
  onChange,
  label,
  className,
}: CheckboxProps) => (
  <Container className={className} as="label" alignItems="center" gap={12}>
    <Box isChecked={value}>{value && <CheckIcon />}</Box>
    {label && (
      <Text style={{ transition: 'none' }} as="div">
        {label}
      </Text>
    )}
    <InvisibleHTMLCheckbox value={value} onChange={onChange} />
  </Container>
)
