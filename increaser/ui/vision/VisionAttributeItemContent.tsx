import { HStack, VStack } from '@lib/ui/layout/Stack'
import { useCurrentVisionAttribute } from './CurrentVisionAttributeProvider'
import { Text } from '@lib/ui/text'
import styled, { useTheme } from 'styled-components'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { visionItemContentMinHeight } from './config'
import { VisionAttributeStatusTag } from './VisionAttributeStatusTag'
import { getColor } from '@lib/ui/theme/getters'
import { SafeImage } from '@lib/ui/images/SafeImage'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { visionImageAspectRatio } from './visionImageAspectRatio'
import { getPublicFileUrl } from '../storage/getPublicFileUrl'
import { Match } from '@lib/ui/base/Match'
import { round } from '@lib/ui/css/round'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { getVisionAttributeStatusColor } from './getVisionAttributeStatusColor'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'

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

const StatusIndicatorContainer = styled(IconWrapper)`
  height: ${toSizeUnit(visionItemContentMinHeight)};
  margin-right: 6px;
`

const StatusIndicator = styled.span`
  ${round};
  ${sameDimensions(8)};
`

type StatusKind = 'shy' | 'regular'

type VisionAttributeItemContentProps = {
  statusKind?: StatusKind
}

export const VisionAttributeItemContent = ({
  statusKind = 'regular',
}: VisionAttributeItemContentProps) => {
  const { name, status, imageId } = useCurrentVisionAttribute()
  const theme = useTheme()

  return (
    <VStack gap={8}>
      <Match
        value={statusKind}
        shy={() => (
          <Name>
            <StatusIndicatorContainer>
              <StatusIndicator
                style={{
                  background: getVisionAttributeStatusColor(
                    status,
                    theme,
                  ).toCssValue(),
                }}
              />
            </StatusIndicatorContainer>
            {name}
          </Name>
        )}
        regular={() => (
          <HStack alignItems="start" justifyContent="space-between" gap={8}>
            <Name>{name}</Name>
            <VisionAttributeStatusTag value={status} />
          </HStack>
        )}
      />
      {imageId && (
        <SafeImage
          src={getPublicFileUrl(imageId)}
          render={(props) => <Image {...props} />}
        />
      )}
    </VStack>
  )
}
