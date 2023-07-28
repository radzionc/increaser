import { FocusGoal } from 'focus/components/FocusGoal'
import { FocusSuccess } from 'focus/components/FocusSucess'
import { SessionProgress } from 'focus/components/SessionProgress'
import { useFocus } from 'focus/hooks/useFocus'
import styled from 'styled-components'
import { VStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'
import { centerContentCSS } from '@increaser/ui/ui/utils/centerContentCSS'
import { MS_IN_SEC } from 'utils/time'
import { SlidingTime } from 'ui/SlidingTime'

const BlockWrapper = styled.div`
  height: 520px;
  width: 100%;
  position: relative;
  ${centerContentCSS};
`

const TimeWrapper = styled.div`
  position: absolute;
  z-index: 1;
`

export const FocusPreview = () => {
  const { currentSet } = useFocus()

  const startTime = currentSet?.startedAt as number

  const getSeconds = () => (Date.now() - startTime) / MS_IN_SEC

  return (
    <VStack alignItems="center" justifyContent="center" style={{ width: 320 }}>
      <BlockWrapper>
        <SessionProgress />
        <TimeWrapper>
          <Text as="div" weight="bold" size={64} height="small">
            <SlidingTime getSeconds={getSeconds} />
          </Text>
        </TimeWrapper>
        <FocusSuccess />
        <FocusGoal />
      </BlockWrapper>
    </VStack>
  )
}
