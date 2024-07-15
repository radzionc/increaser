import { Text } from '@lib/ui/text'
import styled from 'styled-components'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { getColor } from '@lib/ui/theme/getters'
import { ChecklistItemFrame } from '@lib/ui/checklist/ChecklistItemFrame'
import { Center } from '@lib/ui/layout/Center'
import { tightListItemConfig } from '@lib/ui/list/tightListItemConfig'
import { useCurrentVisionAttribute } from './CurrentVisionAttributeProvider'

const Name = styled(Text)`
  text-align: start;
  color: ${getColor('contrast')};
  line-height: ${toSizeUnit(tightListItemConfig.lineHeight)};
`

export const VisionAttributeItemContent = () => {
  const { name, emoji } = useCurrentVisionAttribute()

  return (
    <ChecklistItemFrame>
      <Center>
        <Text color="contrast">{emoji}</Text>
      </Center>
      <Name>{name}</Name>
    </ChecklistItemFrame>
  )
}
