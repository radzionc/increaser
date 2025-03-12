import { cropText } from '@lib/ui/css/cropText'
import { HStack } from '@lib/ui/css/stack'
import { Text } from '@lib/ui/text'
import { Project } from '@product/entities/Project'
import styled from 'styled-components'

const Container = styled(HStack)`
  ${cropText};
`

export const FocusProjectOptionContent = ({
  emoji,
  name,
}: Pick<Project, 'emoji' | 'name'>) => {
  return (
    <Container alignItems="center" gap={8}>
      <Text color="contrast">{emoji}</Text>
      <Text cropped>{name}</Text>
    </Container>
  )
}
