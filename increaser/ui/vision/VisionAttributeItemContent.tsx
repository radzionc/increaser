import { Text } from '@lib/ui/text'
import styled from 'styled-components'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { getColor } from '@lib/ui/theme/getters'
import { ChecklistItemFrame } from '@lib/ui/checklist/ChecklistItemFrame'
import { Center } from '@lib/ui/layout/Center'
import { tightListItemConfig } from '@lib/ui/list/tightListItemConfig'
import { useCurrentVisionAttribute } from './CurrentVisionAttributeProvider'
import { HStack } from '@lib/ui/layout/Stack'
import { VisionAttributeStatusTag } from './VisionAttributeStatusTag'

const Name = styled(Text)`
  text-align: start;
  color: ${getColor('contrast')};
  line-height: ${toSizeUnit(tightListItemConfig.lineHeight)};
`

export const VisionAttributeItemContent = () => {
  const { name, emoji, status } = useCurrentVisionAttribute()

  return (
    <ChecklistItemFrame>
      <Center>
        <Text color="contrast">{emoji}</Text>
      </Center>
      <HStack
        fullWidth
        gap={8}
        alignItems="center"
        justifyContent="space-between"
      >
        <Name>{name}</Name>
        <VisionAttributeStatusTag value={status} />
      </HStack>
    </ChecklistItemFrame>
  )
}
