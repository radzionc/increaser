import { HStack, VStack } from '@lib/ui/layout/Stack'
import { useCurrentVisionAttribute } from './CurrentVisionAttributeProvider'
import { Text } from '@lib/ui/text'
import styled from 'styled-components'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { visionItemContentMinHeight } from './config'
import { VisionAttributeStatusTag } from './VisionAttributeStatusTag'
import { getColor } from '@lib/ui/theme/getters'
import { SafeImage } from '@lib/ui/images/SafeImage'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { visionImageAspectRatio } from './visionImageAspectRatio'
import { getPublicFileUrl } from '../storage/getPublicFileUrl'

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

export const VisionAttributeItemContent = () => {
  const { name, status, imageId } = useCurrentVisionAttribute()

  return (
    <VStack gap={8}>
      <HStack alignItems="start" justifyContent="space-between" gap={8}>
        <Name>{name}</Name>
        <VisionAttributeStatusTag value={status} />
      </HStack>
      {imageId && (
        <SafeImage
          src={getPublicFileUrl(imageId)}
          render={(props) => <Image {...props} />}
        />
      )}
    </VStack>
  )
}
