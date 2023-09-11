import { HStack, VStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'
import { Button } from '@increaser/ui/ui/buttons/Button'
import { centerContentCSS } from '@increaser/ui/ui/utils/centerContentCSS'
import { MS_IN_MIN } from '@increaser/utils/time'
import { useState } from 'react'
import { useLastSetEnd } from 'sets/hooks/useLastSetEnd'
import { useRhythmicRerender } from '@increaser/ui/hooks/useRhythmicRerender'
import { useStartOfDay } from '@increaser/ui/hooks/useStartOfDay'
import styled from 'styled-components'
import { useAssertUserState } from 'user/state/UserStateContext'
import { UnlockIcon } from '@increaser/ui/ui/icons/UnlockIcon'
import { takeWholeSpaceAbsolutely } from '@increaser/ui/css/takeWholeSpaceAbsolutely'

const Overlay = styled.div`
  ${takeWholeSpaceAbsolutely};
  ${centerContentCSS};
  background: ${(props) =>
    props.theme.colors.foreground.getVariant({ a: () => 0.9 }).toCssValue()};
`

export const WorkdayFinished = () => {
  const lastSetEnd = useLastSetEnd()
  const now = useRhythmicRerender()
  const todayStartedAt = useStartOfDay()

  const [isLocked, setIsLocked] = useState(true)

  const { goalToFinishWorkBy } = useAssertUserState()
  const workdayEndsAt = todayStartedAt + goalToFinishWorkBy * MS_IN_MIN

  if (
    now < workdayEndsAt ||
    (lastSetEnd && lastSetEnd > workdayEndsAt) ||
    !isLocked
  ) {
    return null
  }

  return (
    <Overlay>
      <VStack alignItems="center" gap={40}>
        <VStack gap={16} alignItems="center">
          <Text color="contrast" weight="bold" size={20}>
            🎉 Workday Accomplished!
          </Text>

          <Text style={{ maxWidth: 320 }} centered height="large">
            Embrace your evening, recharge, and wake up ready to conquer
            tomorrow.
          </Text>
        </VStack>

        <Button onClick={() => setIsLocked(false)} kind="alert">
          <HStack alignItems="center" gap={8}>
            <UnlockIcon />
            <Text>Continue working</Text>
          </HStack>
        </Button>
      </VStack>
    </Overlay>
  )
}
