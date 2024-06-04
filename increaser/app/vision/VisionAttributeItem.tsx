import { HStack, VStack } from '@lib/ui/layout/Stack'
import { useCurrentVisionAttribute } from './CurrentVisionAttributeProvider'
import { Text } from '@lib/ui/text'
import styled from 'styled-components'
import { Hoverable } from '@lib/ui/base/Hoverable'
import { verticalPadding } from '@lib/ui/css/verticalPadding'
import { EditVisionAttributeForm } from './form/EditVisionAttributeForm'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { visionItemContentMinHeight, visionItemVerticalPadding } from './config'
import { VisionAttributeStatusTag } from './VisionAttributeStatusTag'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { getColor } from '@lib/ui/theme/getters'
import { SafeImage } from '@lib/ui/images/SafeImage'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { visionImageAspectRatio } from './visionImageAspectRatio'

const Container = styled(Hoverable)`
  ${verticalPadding(visionItemVerticalPadding)};
  text-align: start;
  width: 100%;
`

const Name = styled(Text)`
  text-align: start;
  font-weight: 500;
  color: ${getColor('contrast')};
  font-size: 14px;
  line-height: ${toSizeUnit(visionItemContentMinHeight)};
`

const Image = styled.img`
  ${visionImageAspectRatio};
  width: 100%;
  ${borderRadius.m};
  object-fit: cover;
`

export const VisionAttributeItem = () => {
  const { name, status, id, imageUrl } = useCurrentVisionAttribute()

  const [activeItemId, setActiveItemId] = useActiveItemId()

  if (activeItemId === id) {
    return <EditVisionAttributeForm />
  }

  return (
    <Container
      onClick={() => {
        setActiveItemId(id)
      }}
      verticalOffset={0}
    >
      <VStack gap={8}>
        <HStack alignItems="start" justifyContent="space-between" gap={8}>
          <Name>{name}</Name>
          <VisionAttributeStatusTag value={status} />
        </HStack>
        {imageUrl && (
          <SafeImage src={imageUrl} render={(props) => <Image {...props} />} />
        )}
      </VStack>
    </Container>
  )
}
