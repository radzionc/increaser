import {
  VisionAttributeStatus,
  visionAttributeStatusNameRecord,
} from '@increaser/entities/Vision'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { ComponentWithValueProps } from '@lib/ui/props'
import styled, { useTheme } from 'styled-components'
import { visionItemContentMinHeight } from './config'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { coloredTag } from '@lib/ui/css/coloredTag'
import { getVisionAttributeStatusColor } from './getVisionAttributeStatusColor'
import { HSLA } from '@lib/ui/colors/HSLA'
import { centerContent } from '@lib/ui/css/centerContent'
import { horizontalPadding } from '@lib/ui/css/horizontalPadding'

const Container = styled.div<{ $color: HSLA }>`
  height: ${toSizeUnit(visionItemContentMinHeight)};
  ${borderRadius.s};
  font-size: 14px;
  flex-shrink: 0;
  font-weight: 500;
  ${centerContent};
  ${horizontalPadding(8)}
  ${({ $color }) => coloredTag($color)}
`

export const VisionAttributeStatusTag = ({
  value,
}: ComponentWithValueProps<VisionAttributeStatus>) => {
  const theme = useTheme()

  return (
    <Container
      style={{ flexShrink: 0 }}
      $color={getVisionAttributeStatusColor(value, theme)}
    >
      {visionAttributeStatusNameRecord[value]}
    </Container>
  )
}
