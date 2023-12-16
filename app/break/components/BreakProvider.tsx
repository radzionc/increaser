import { breakMinutesOptions } from 'break/breakDuration'
import { focusDurations } from 'focus/FocusDuration'
import { ReactNode, useEffect, useState } from 'react'
import { Path } from 'router/Path'
import { getBlockWorkDuration, getBlocks, targetBlockInMin } from 'sets/Block'
import { useLastSetEnd } from 'sets/hooks/useLastSetEnd'
import { useTodaySets } from 'sets/hooks/useTodaySets'
import { useStartOfDay } from '@increaser/ui/hooks/useStartOfDay'

import { pluralizeName } from '@increaser/utils/pluralize'
import { range } from '@increaser/utils/array/range'
import { PersistentStateKey } from 'state/persistentState'
import { usePersistentState } from 'state/persistentState'
import { useAssertUserState } from 'user/state/UserStateContext'
import { MS_IN_MIN, MS_IN_SEC } from '@increaser/utils/time'

import { BreakContext, BreakDuration } from '../context/BreakContext'
import { useRouter } from 'next/router'
import { getLastItem } from '@increaser/utils/array/getLastItem'
import {
  areNotificationsAllowed,
  showNotification,
} from '@increaser/ui/notifications/utils'
import { attempt } from '@increaser/utils/attempt'
import { speak } from '@increaser/ui/notifications/utils/speak'

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
  const { finishWorkAt } = useAssertUserState()
  const sets = useTodaySets()

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
  const { pathname } = useRouter()

  useEffect(() => {
    if (pathname === Path.Focus && breakDuration) {
      setBreakDuration(undefined)
    }
  }, [breakDuration, pathname, setBreakDuration])

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

    // TODO: implement a better solution
    if (now - lastSetEnd > 1 * MS_IN_SEC) return

    const blocks = getBlocks(sets)
    const block = getLastItem(blocks)
    const blockWorkDuration = getBlockWorkDuration(block) / MS_IN_MIN
    if (blockWorkDuration + focusDurations[0] > targetBlockInMin) {
      return
    }

    if (blockWorkDuration >= targetBlockInMin - 10) {
      setBreakDuration('long')
    } else if (blockWorkDuration < targetBlockInMin / 3) {
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
