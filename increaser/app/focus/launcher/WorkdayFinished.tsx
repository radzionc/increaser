import { HStack, VStack } from '@lib/ui/css/stack'
import { Text } from '@lib/ui/text'
import { Button } from '@lib/ui/buttons/Button'
import { centerContent } from '@lib/ui/css/centerContent'
import { MS_IN_MIN } from '@lib/utils/time'
import { useState } from 'react'
import { useLastSetEnd } from '@increaser/app/sets/hooks/useLastSetEnd'
import { useRhythmicRerender } from '@lib/ui/hooks/useRhythmicRerender'
import { useStartOfDay } from '@lib/ui/hooks/useStartOfDay'
import styled from 'styled-components'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { UnlockIcon } from '@lib/ui/icons/UnlockIcon'
import { takeWholeSpaceAbsolutely } from '@lib/ui/css/takeWholeSpaceAbsolutely'
import { ElementSizeAware } from '@lib/ui/base/ElementSizeAware'

const Overlay = styled.div`
  ${takeWholeSpaceAbsolutely};
  ${centerContent};
  background: ${(props) =>
    props.theme.colors.foreground.getVariant({ a: () => 0.9 }).toCssValue()};
`

export const WorkdayFinished = () => {
  const lastSetEnd = useLastSetEnd()
  const now = useRhythmicRerender()
  const todayStartedAt = useStartOfDay()

  const [isLocked, setIsLocked] = useState(true)

  const { finishWorkAt } = useAssertUserState()
  const workdayEndsAt = todayStartedAt + finishWorkAt * MS_IN_MIN

  if (
    now < workdayEndsAt ||
    (lastSetEnd && lastSetEnd > workdayEndsAt) ||
    !isLocked
  ) {
    return null
  }

  return (
    <ElementSizeAware
      render={({ setElement, size }) => {
        const isSmall = size && size.height < 320
        return (
          <Overlay ref={setElement}>
            <VStack alignItems="center" gap={isSmall ? 20 : 40}>
              <VStack gap={16} alignItems="center">
                <Text color="contrast" weight="600" size={20}>
                  🎉 Workday Accomplished!
                </Text>

                {!isSmall && (
                  <Text style={{ maxWidth: 320 }} centered height="large">
                    Embrace your evening, recharge, and wake up ready to conquer
                    tomorrow.
                  </Text>
                )}
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
      }}
    />
  )
}
