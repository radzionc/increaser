import { HStack } from '@lib/ui/layout/Stack'
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

const Container = styled(Hoverable)`
  ${verticalPadding(visionItemVerticalPadding)};
  text-align: start;
  width: 100%;
`

const Name = styled(Text)`
  text-align: start;
  font-weight: 500;
  font-size: 14px;
  line-height: ${toSizeUnit(visionItemContentMinHeight)};
`

export const VisionAttributeItem = () => {
  const { name, status, id } = useCurrentVisionAttribute()

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
      <HStack alignItems="start" justifyContent="space-between" gap={8}>
        <Name>{name}</Name>
        <VisionAttributeStatusTag value={status} />
      </HStack>
    </Container>
  )
}
