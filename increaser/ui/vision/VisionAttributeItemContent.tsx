import { Text } from '@lib/ui/text'
import styled from 'styled-components'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { getColor } from '@lib/ui/theme/getters'
import { tightListItemConfig } from '@lib/ui/list/tightListItemConfig'
import { useCurrentVisionAttribute } from './CurrentVisionAttributeProvider'
import { VStack } from '@lib/ui/css/stack'
import { PrefixedItemFrame } from '@lib/ui/list/PrefixedItemFrame'
import { verticalPadding } from '@lib/ui/css/verticalPadding'

const Name = styled(Text)`
  text-align: start;
  color: ${getColor('contrast')};
  line-height: ${toSizeUnit(tightListItemConfig.lineHeight)};
`

const Header = styled(PrefixedItemFrame)`
  ${verticalPadding(0)};
  gap: 4px;
`

const Container = styled(VStack)`
  ${verticalPadding(tightListItemConfig.verticalPadding)};
`

export const VisionAttributeItemContent = () => {
  const { name, emoji, description } = useCurrentVisionAttribute()

  return (
    <Container>
      <Header prefix={<Text color="contrast">{emoji}</Text>}>
        <Name>{name}</Name>
      </Header>
      {description && (
        <Text size={14} color="supporting" style={{ whiteSpace: 'pre-line' }}>
          {description}
        </Text>
      )}
    </Container>
  )
}
