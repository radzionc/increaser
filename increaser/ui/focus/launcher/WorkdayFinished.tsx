import { HStack, VStack } from '@lib/ui/css/stack'
import { Text } from '@lib/ui/text'
import { Button } from '@lib/ui/buttons/Button'
import { centerContent } from '@lib/ui/css/centerContent'
import { useLastSetEnd } from '@increaser/app/sets/hooks/useLastSetEnd'
import { useRhythmicRerender } from '@lib/ui/hooks/useRhythmicRerender'
import styled from 'styled-components'
import { UnlockIcon } from '@lib/ui/icons/UnlockIcon'
import { takeWholeSpaceAbsolutely } from '@lib/ui/css/takeWholeSpaceAbsolutely'
import { ElementSizeAware } from '@lib/ui/base/ElementSizeAware'
import { useWorkDayEndsAt } from '@increaser/ui/schedule/hooks/useWorkDayEndsAt'
import { useUnlockedLateWorkAt } from '../state/unlockedLateWorkAt'
import { useIsTodayLateWorkUnlocked } from '../state/useIsTodayLateWorkUnlocked'
import { borderRadius } from '@lib/ui/css/borderRadius'

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
