import { useWeekdaySets } from '@increaser/ui/sets/hooks/useWeekdaySets'
import { useStartOfWeekday } from '@lib/ui/time/hooks/useStartOfWeekday'
import { useSelectedWeekday } from '@lib/ui/time/SelectedWeekdayProvider'
import { useMemo } from 'react'
import { areEqualIntervals } from '@lib/utils/interval/areEqualIntervals'
import { SetItem } from './SetItem'
import { pick } from '@lib/utils/record/pick'
import { usePresentState } from '@lib/ui/state/usePresentState'
import { useActiveSet } from '../ActiveSetProvider'
import { getSetHash } from '@increaser/entities-utils/set/getSetHash'
import { setEditorConfig } from './config'

export const Sets = () => {
  const [weekday] = useSelectedWeekday()
  const weekdayStartedAt = useStartOfWeekday(weekday)
  const sets = useWeekdaySets(weekday)

  const [currentSet, setActiveState] = usePresentState(useActiveSet())

  const items = useMemo(() => {
    const { initialSet } = currentSet
    if (!initialSet) return sets

    return sets.filter((set) => !areEqualIntervals(set, initialSet))
  }, [currentSet, sets])

  return (
    <>
      {items.map((value, index) => (
        <SetItem
          key={getSetHash(value)}
          value={value}
          index={index}
          onSelect={() => {
            setActiveState({
              initialSet: value,
              ...pick(value, ['start', 'end', 'projectId']),
            })
          }}
          style={{
            top: setEditorConfig.msToPx(value.start - weekdayStartedAt),
            height: setEditorConfig.msToPx(value.end - value.start),
          }}
        />
      ))}
    </>
  )
}
