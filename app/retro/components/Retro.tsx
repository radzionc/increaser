import { useYesterdayHabits } from 'habits/hooks/useYesterdayHabits'
import { useMemo } from 'react'
import { getDaySets } from 'sets/helpers/getDaySets'
import { getYesterday } from '@increaser/utils/time/getYesterday'
import { isToday } from '@increaser/utils/time/isToday'
import { PersistentStateKey } from 'state/persistentState'
import { usePersistentState } from 'state/persistentState'
import { useAssertUserState, useUserState } from 'user/state/UserStateContext'

import { YesterdayRetroOverlay } from './YesterdayRetroOverlay'

const retroStages = ['yesterday'] as const
type RetroStage = (typeof retroStages)[number]

export const Retro = () => {
  const [lastYesterdayRetroWasAt, setLastYesterdaytRetroWasAt] =
    usePersistentState<number | null>(
      PersistentStateKey.YesterdayRetroWasAt,
      null,
    )
  const { lastUpdatedAt: userStateUpdatedAt } = useUserState()

  const { sets } = useAssertUserState()

  const habits = useYesterdayHabits()

  const retroStage: RetroStage | null = useMemo(() => {
    if (!userStateUpdatedAt) return null

    if (!isToday(new Date(userStateUpdatedAt))) return null

    const wasYesterdayRetroShownToday =
      lastYesterdayRetroWasAt && isToday(new Date(lastYesterdayRetroWasAt))

    const yesterday = getYesterday()
    const yesterdaySets = getDaySets(sets, yesterday.getTime())

    const hasYesterdayDataToShow = yesterdaySets.length || habits.length

    if (!wasYesterdayRetroShownToday && hasYesterdayDataToShow) {
      return 'yesterday'
    }
    return null
  }, [habits.length, lastYesterdayRetroWasAt, sets, userStateUpdatedAt])

  if (!retroStage) return null

  return (
    <YesterdayRetroOverlay
      onClose={() => setLastYesterdaytRetroWasAt(Date.now())}
    />
  )
}
