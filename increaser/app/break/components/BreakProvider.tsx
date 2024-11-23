import { breakMinutesOptions } from '@increaser/app/break/breakDuration'
import { ReactNode, useEffect, useState } from 'react'
import { useLastSetEnd } from '@increaser/app/sets/hooks/useLastSetEnd'
import { useTodaySets } from '@increaser/app/sets/hooks/useTodaySets'
import { useStartOfDay } from '@lib/ui/hooks/useStartOfDay'

import { pluralizeName } from '@lib/utils/pluralize'
import { range } from '@lib/utils/array/range'
import { PersistentStateKey } from '@increaser/ui/state/persistentState'
import { usePersistentState } from '@increaser/ui/state/persistentState'
import { MS_IN_MIN, MS_IN_SEC } from '@lib/utils/time'

import { BreakContext, BreakDuration } from '../context/BreakContext'
import { getLastItem } from '@lib/utils/array/getLastItem'
import {
  areNotificationsAllowed,
  showNotification,
} from '@lib/ui/notifications/utils'
import { attempt } from '@lib/utils/attempt'
import { speak } from '@lib/ui/notifications/utils/speak'
import { focusDurations } from '@increaser/entities/FocusDuration'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { useUser } from '@increaser/ui/user/state/user'
import {
  getBlocks,
  getBlockWorkDuration,
} from '@increaser/entities-utils/block'
import { blockTargetDuration } from '@increaser/entities/Block'
import { useFocusIntervals } from '@increaser/ui/focus/state/focusIntervals'

export const remindersCount = 5

interface Props {
  children: ReactNode
}

const numberToText = (number: number) => {
  const record: Record<number, string> = {
    5: 'five',
    6: 'six',
    7: 'seven',
    8: 'eight',
    9: 'nine',
    10: 'ten',
    11: 'eleven',
    12: 'twelve',
    13: 'thirteen',
    14: 'fourteen',
    15: 'fifteen',
    16: 'sixteen',
    17: 'seventeen',
    18: 'eighteen',
    19: 'nineteen',
    20: 'twenty',
  }

  return record[number] || number.toString()
}

export const BreakProvider = ({ children }: Props) => {
  const [breakDuration, setBreakDuration] = useState<BreakDuration>(undefined)

  const todayStartedAt = useStartOfDay()
  const { finishWorkAt } = useUser()
  const sets = useTodaySets()
  const [intervals] = useFocusIntervals()

  const [hasBrowserNotification, setHasBrowserNotification] =
    usePersistentState<boolean>(
      PersistentStateKey.HasBreakBrowserNotification,
      areNotificationsAllowed(),
    )
  const [hasSoundNotification, setHasSoundNotification] =
    usePersistentState<boolean>(
      PersistentStateKey.HasBreakSoundNotification,
      true,
    )

  const [hasAutomaticBreak, setHasAutomaticBreak] = usePersistentState<boolean>(
    PersistentStateKey.HasBreakAutomaticBreak,
    true,
  )

  const lastSetEnd = useLastSetEnd()

  useEffect(() => {
    if (intervals && breakDuration) {
      setBreakDuration(undefined)
    }
  }, [breakDuration, intervals])

  useEffect(() => {
    if (!breakDuration || !lastSetEnd) return

    if (!hasBrowserNotification) return

    if (breakDuration === 'long') return

    const now = Date.now()
    const breakEnd = lastSetEnd + breakDuration * MS_IN_MIN

    const timeouts = range(remindersCount)
      .map((reminderNumber) => breakEnd + (reminderNumber + 1) * MS_IN_MIN)
      .filter((time) => time > now)
      .map((time) =>
        setTimeout(() => {
          const now = Date.now()
          if (now < time - 5 * MS_IN_SEC || now > time + 5 * MS_IN_SEC) return

          const minutes = Math.round((now - lastSetEnd) / MS_IN_MIN)
          if (hasSoundNotification) {
            attempt(
              () =>
                speak(
                  `The break started ${numberToText(minutes)} ${pluralizeName(
                    minutes,
                    'minute',
                  )} ago`,
                ),
              undefined,
            )
          }
          showNotification(
            `The break started ${minutes} ${pluralizeName(
              minutes,
              'minute',
            )} ago`,
          )
        }, time - now),
      )

    if (breakEnd > now) {
      const breakOverMessage = `The  ${numberToText(
        breakDuration,
      )} ${pluralizeName(breakDuration, 'minute')} break is over!`
      timeouts.push(
        setTimeout(() => {
          showNotification(breakOverMessage)
          if (hasSoundNotification) {
            attempt(() => speak(breakOverMessage), undefined)
          }
        }, breakEnd - now),
      )
    }

    return () => {
      timeouts.forEach(clearTimeout)
    }
  }, [breakDuration, hasBrowserNotification, hasSoundNotification, lastSetEnd])

  useEffect(() => {
    if (!hasAutomaticBreak) return

    const now = Date.now()
    const wordayEndsAt = todayStartedAt + finishWorkAt * MS_IN_MIN
    if (wordayEndsAt - now < 25 * MS_IN_MIN) return

    const lastSet = getLastItem(sets)
    if (!lastSet || !lastSetEnd) return

    if (now - lastSetEnd > 1 * MS_IN_SEC) return

    const blocks = getBlocks(sets)
    const block = shouldBePresent(getLastItem(blocks))
    const blockWorkDuration = getBlockWorkDuration(block) / MS_IN_MIN
    if (blockWorkDuration + focusDurations[0] > blockTargetDuration) {
      return
    }

    if (blockWorkDuration >= blockTargetDuration - 10) {
      setBreakDuration('long')
    } else if (blockWorkDuration < blockTargetDuration / 3) {
      setBreakDuration(breakMinutesOptions[0])
    } else {
      setBreakDuration(breakMinutesOptions[1])
    }
  }, [finishWorkAt, hasAutomaticBreak, lastSetEnd, sets, todayStartedAt])

  return (
    <BreakContext.Provider
      value={{
        breakDuration,
        setBreakDuration,
        hasBrowserNotification,
        setHasBrowserNotification,
        hasSoundNotification,
        setHasSoundNotification,
        hasAutomaticBreak,
        setHasAutomaticBreak,
      }}
    >
      {children}
    </BreakContext.Provider>
  )
}
