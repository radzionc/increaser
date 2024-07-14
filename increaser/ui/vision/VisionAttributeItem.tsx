import { useCurrentVisionAttribute } from './CurrentVisionAttributeProvider'
import styled from 'styled-components'
import { Hoverable } from '@lib/ui/base/Hoverable'
import { EditVisionAttributeForm } from './form/EditVisionAttributeForm'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'

import { VisionAttributeItemContent } from './VisionAttributeItemContent'

const Container = styled(Hoverable)`
  text-align: start;
  width: 100%;
`

export const VisionAttributeItem = () => {
  const { id } = useCurrentVisionAttribute()

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
      <VisionAttributeItemContent />
    </Container>
  )
}
