import { HStack } from '@lib/ui/layout/Stack'
import { useCurrentVisionAttribute } from './CurrentVisionAttributeProvider'
import { Text } from '@lib/ui/text'
import styled from 'styled-components'
import { Hoverable } from '@lib/ui/base/Hoverable'
import { verticalPadding } from '@lib/ui/css/verticalPadding'
import { useVisionManager } from './VisionManagerProvider'
import { EditVisionAttributeForm } from './form/EditVisionAttributeForm'
import { getColor } from '@lib/ui/theme/getters'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { visionItemContentMinHeight, visionItemVerticalPadding } from './config'
import { VisionAttributeStatusTag } from './VisionAttributeStatusTag'

const Container = styled(Hoverable)`
  ${verticalPadding(visionItemVerticalPadding)};
  text-align: start;
`

const Name = styled(Text)`
  text-align: start;
  color: ${getColor('contrast')};
  font-weight: 500;
  font-size: 14px;
  line-height: ${toSizeUnit(visionItemContentMinHeight)};
`

export const VisionAttributeItem = () => {
  const { name, status, id } = useCurrentVisionAttribute()

  const { activeItemId, setState } = useVisionManager()

  if (activeItemId === id) {
    return <EditVisionAttributeForm />
  }

  return (
    <Container
      onClick={() => {
        setState((state) => ({
          ...state,
          activeItemId: id,
        }))
      }}
      verticalOffset={0}
    >
      <HStack alignItems="start" justifyContent="space-between" gap={8}>
        <Name>{name}</Name>
        <VisionAttributeStatusTag value={status} />
      </HStack>
    </Container>
  )
}
