import { ElementSizeAware } from '@lib/ui/base/ElementSizeAware'
import { Button } from '@lib/ui/buttons/Button'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { centerContent } from '@lib/ui/css/centerContent'
import { HStack, VStack } from '@lib/ui/css/stack'
import { takeWholeSpaceAbsolutely } from '@lib/ui/css/takeWholeSpaceAbsolutely'
import { useRhythmicRerender } from '@lib/ui/hooks/useRhythmicRerender'
import { UnlockIcon } from '@lib/ui/icons/UnlockIcon'
import { Text } from '@lib/ui/text'
import { useLastSetEnd } from '@product/app/sets/hooks/useLastSetEnd'
import { useWorkDayEndsAt } from '@product/ui/schedule/hooks/useWorkDayEndsAt'
import styled from 'styled-components'

import { useUnlockedLateWorkAt } from '../state/unlockedLateWorkAt'
import { useIsTodayLateWorkUnlocked } from '../state/useIsTodayLateWorkUnlocked'

const Overlay = styled.div`
  ${takeWholeSpaceAbsolutely};
  ${centerContent};
  background: ${(props) =>
    props.theme.colors.foreground.getVariant({ a: () => 0.9 }).toCssValue()};
  ${borderRadius.s}
`

export const WorkdayFinished = () => {
  const lastSetEnd = useLastSetEnd()
  const now = useRhythmicRerender()

  const [, setUnlockedLateWorkAt] = useUnlockedLateWorkAt()

  const isTodayLateWorkUnlocked = useIsTodayLateWorkUnlocked()

  const workdayEndsAt = useWorkDayEndsAt()

  if (
    now < workdayEndsAt ||
    (lastSetEnd && lastSetEnd > workdayEndsAt) ||
    isTodayLateWorkUnlocked
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
                <Text
                  centerHorizontally
                  color="contrast"
                  weight="600"
                  size={20}
                >
                  🎉 Workday Accomplished!
                </Text>

                {!isSmall && (
                  <Text style={{ maxWidth: 320 }} centerHorizontally height="l">
                    Embrace your evening, recharge, and wake up ready to conquer
                    tomorrow.
                  </Text>
                )}
              </VStack>

              <Button onClick={() => setUnlockedLateWorkAt(now)} kind="alert">
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
