import styled from 'styled-components'
import { Button } from '../buttons/Button'
import { HStack } from '../Stack'
import { inputBackgroundCSS, inputBorderRadiusCSS } from './config'
import { Text } from '../Text'

interface Props {
  name: string
  onRemove: () => void
}

const Container = styled.div`
  ${inputBackgroundCSS};
  ${inputBorderRadiusCSS};
  padding: 16px;
`

export const SelectedFile = ({ name, onRemove }: Props) => (
  <Container>
    <HStack gap={24} justifyContent="space-between" alignItems="center">
      <Text cropped>{name}</Text>
      <Button onClick={onRemove}>Remove</Button>
    </HStack>
  </Container>
)
