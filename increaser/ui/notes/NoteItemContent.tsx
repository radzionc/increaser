import { VStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import styled from 'styled-components'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { useCurrentNote } from './CurrentNoteProvider'
import { getColor } from '@lib/ui/theme/getters'
import { tightListItemConfig } from '@lib/ui/list/tightListItemConfig'
import { PrefixedItemFrame } from '@lib/ui/list/PrefixedItemFrame'
import { useAssertUserState } from '../user/UserStateContext'
import { NoteDescription } from './NoatDescription'

const Name = styled(Text)`
  text-align: start;
  font-weight: 500;
  color: ${getColor('contrast')};
  font-size: 16px;
  line-height: ${toSizeUnit(tightListItemConfig.lineHeight)};
`

export const NoteItemContent = () => {
  const { description, name, projectId } = useCurrentNote()
  const { projects } = useAssertUserState()

  return (
    <VStack>
      <PrefixedItemFrame
        prefix={<Text color="contrast">{projects[projectId].emoji}</Text>}
      >
        <Name>{name}</Name>
      </PrefixedItemFrame>
      {description && <NoteDescription />}
    </VStack>
  )
}
