import { HStack } from '@lib/ui/css/stack'

import { Project } from '@increaser/entities/Project'
import { Text } from '@lib/ui/text'
import styled from 'styled-components'
import { cropText } from '@lib/ui/css/cropText'

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
