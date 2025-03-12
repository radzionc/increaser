import { useRhythmicRerender } from '@lib/ui/hooks/useRhythmicRerender'
import { getLastItem } from '@lib/utils/array/getLastItem'
import { convertDuration } from '@lib/utils/time/convertDuration'

import { useAssertFocusIntervals } from '../state/focusIntervals'

import { ReduceLastInterval } from './ReduceLastInterval'

export const CropLastInterval = () => {
  const now = useRhythmicRerender()

  const intervals = useAssertFocusIntervals()

  const { start } = getLastItem(intervals)

  const max = Math.floor(convertDuration(now - start, 'ms', 'min'))

  if (max < 2) return null

  return <ReduceLastInterval max={max} />
}
