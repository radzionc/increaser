import { shyTextButton } from '@lib/ui/buttons/ShyTextButton'
import { EmptyState } from '@lib/ui/data/empty/EmptyState'
import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'
import { isEmpty } from '@lib/utils/array/isEmpty'
import { order } from '@lib/utils/array/order'
import { LearnMoreShyAction } from '@product/ui/info/LearnMoreShyAction'
import { getAppPath } from '@product/ui/navigation/app'
import { useUser } from '@product/ui/user/state/user'
import { CurrentVisionAttributeProvider } from '@product/ui/vision/CurrentVisionAttributeProvider'
import Link from 'next/link'
import styled from 'styled-components'

import { ActiveVisionItem } from './ActiveVisionItem'
import { AddVisionAttribute } from './AddVisionAttribute'
import { VisionBoardContainer } from './VisionBoardContainer'
import { VisionBoardItem } from './VisionBoardItem'

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
