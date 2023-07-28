import { ComponentProps, ReactNode } from 'react'
import styled from 'styled-components'
import { defaultTransitionCSS } from '../animations/transitions'
import { Text } from '../Text'
import { UnstyledButton } from './UnstyledButton'

const Container = styled(UnstyledButton)`
  ${defaultTransitionCSS};
  :hover {
    filter: brightness(1.2);
  }
`

interface Props extends ComponentProps<typeof Container> {
  text: ReactNode
}

export const TextButton = ({ text, onClick, as }: Props) => (
  <Container onClick={onClick} as={as}>
    <Text as="span" color="primary" weight="bold">
      {text}
    </Text>
  </Container>
)
