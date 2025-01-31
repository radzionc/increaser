import { useUser } from '@increaser/ui/user/state/user'
import { order } from '@lib/utils/array/order'
import { CurrentVisionAttributeProvider } from '@increaser/ui/vision/CurrentVisionAttributeProvider'
import { VisionBoardItem } from './VisionBoardItem'
import { VisionBoardContainer } from './VisionBoardContainer'
import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'
import { ActiveVisionItem } from './ActiveVisionItem'
import { isEmpty } from '@lib/utils/array/isEmpty'
import { EmptyState } from '@lib/ui/data/empty/EmptyState'
import { LearnMoreShyAction } from '@lib/ui/info/LearnMoreShyAction'
import { AddVisionAttribute } from './AddVisionAttribute'
import Link from 'next/link'
import { getAppPath } from '@increaser/ui/navigation/app'
import { shyTextButton } from '@lib/ui/buttons/ShyTextButton'
import styled from 'styled-components'

const VisionIdeasLink = styled(Link)`
  ${shyTextButton}
`

export const MyVisionBoard = () => {
  const { vision } = useUser()
  const items = order(Object.values(vision), (item) => item.order, 'asc')

  if (isEmpty(items)) {
    return (
      <EmptyState
        title="Start with your first aspiration"
        action={
          <>
            <LearnMoreShyAction value="vision" />
            <AddVisionAttribute />
          </>
        }
        description={
          <>
            Define what your perfect life looks like. Need inspiration?{' '}
            <VisionIdeasLink href={getAppPath('vision', 'ideas')}>
              Explore our vision ideas
            </VisionIdeasLink>{' '}
            for different areas of life.
          </>
        }
      />
    )
  }

  return (
    <ActiveItemIdProvider initialValue={null}>
      <ActiveVisionItem />
      <VisionBoardContainer>
        {items.map((value) => (
          <CurrentVisionAttributeProvider key={value.id} value={value}>
            <VisionBoardItem />
          </CurrentVisionAttributeProvider>
        ))}
      </VisionBoardContainer>
    </ActiveItemIdProvider>
  )
}
