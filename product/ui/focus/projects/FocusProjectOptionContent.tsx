import { cropText } from '@lib/ui/css/cropText'
import { HStack } from '@lib/ui/css/stack'
import { ShortcutHint } from '@lib/ui/keyboard/ShortcutHint'
import { Text } from '@lib/ui/text'
import { Project } from '@product/entities/Project'
import styled from 'styled-components'

const Container = styled(HStack)`
  ${cropText};
`

type FocusProjectOptionContentProps = Pick<Project, 'emoji' | 'name'> & {
  shortcut?: string
}

export const FocusProjectOptionContent = ({
  emoji,
  name,
  shortcut,
}: FocusProjectOptionContentProps) => {
  return (
    <Container alignItems="center" gap={8}>
      <Text color="contrast">{emoji}</Text>
      <Text cropped>{name}</Text>
      {shortcut && <ShortcutHint>{shortcut}</ShortcutHint>}
    </Container>
  )
}
