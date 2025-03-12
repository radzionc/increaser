import { RhythmicRerender } from '@lib/ui/base/RhythmicRerender'
import { Button } from '@lib/ui/buttons/Button'
import { HStack } from '@lib/ui/css/stack'
import { CoffeeIcon } from '@lib/ui/icons/CoffeeIcon'
import { getLastItem } from '@lib/utils/array/getLastItem'
import { isEmpty } from '@lib/utils/array/isEmpty'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { useTodaySets } from '@product/app/sets/hooks/useTodaySets'

import { breakDurations } from './duration/BreakDuration'
import { useBreakDuration } from './duration/state/useBreakDuration'
import { useDefaultBreakDuration } from './duration/state/useDefaultBreakDuration'

export const StartBreak = () => {
  const [breakDuration, setBreakDuration] = useBreakDuration()
  const [defaultBreakDuration] = useDefaultBreakDuration()

  const todaySets = useTodaySets()

  if (breakDuration) {
    return null
  }

  if (isEmpty(todaySets)) {
    return null
  }

  const { end } = getLastItem(todaySets)

  return (
    <RhythmicRerender
      render={(time) => {
        const duration = time - end

        const maxBreakDuration = getLastItem(breakDurations)

        if (duration > convertDuration(maxBreakDuration, 'min', 'ms')) {
          return null
        }

        return (
          <Button
            onClick={() => setBreakDuration(defaultBreakDuration)}
            kind="secondary"
          >
            <HStack alignItems="center" gap={8}>
              <CoffeeIcon />
              Break
            </HStack>
          </Button>
        )
      }}
    />
  )
}
