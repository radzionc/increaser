import styled, { css } from 'styled-components'

import { InputErrorText } from './InputErrorText'
import { getColor, matchColor } from '../theme/getters'
import { VStack } from '../Stack'
import { Text } from '../Text'
import { ComponentProps } from 'react'

const Container = styled(VStack)<{ isValid: boolean }>`
  color: ${matchColor('isValid', {
    true: 'textSupporting',
    false: 'alert',
  })};

  ${({ isValid }) =>
    isValid &&
    css`
      :focus-within {
        color: ${getColor('text')};
      }
    `}
`

export interface InputWrapperProps extends ComponentProps<typeof Container> {
  label?: React.ReactNode
  error?: string
  children: React.ReactNode
}

export const InputWrapper = ({
  label,
  children,
  error,
  as = 'label',
  ...props
}: InputWrapperProps) => (
  <Container
    tabIndex="-1"
    isValid={!error}
    fullWidth
    gap={8}
    as={as}
    {...props}
  >
    {label && <Text as="div">{label}</Text>}
    {children}
  </Container>
)

export const InputWrapperWithErrorMessage = ({
  children,
  ...props
}: InputWrapperProps) => (
  <InputWrapper {...props}>
    <VStack style={{ position: 'relative' }} fullWidth gap={4}>
      <>
        {children}
        <InputErrorText>{props.error}</InputErrorText>
      </>
    </VStack>
  </InputWrapper>
)
