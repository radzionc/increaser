import { useWeekdaySets } from '@increaser/ui/sets/hooks/useWeekdaySets'
import { useStartOfWeekday } from '@lib/ui/time/hooks/useStartOfWeekday'
import { useSelectedWeekday } from '@lib/ui/time/SelectedWeekdayProvider'
import { useMemo } from 'react'
import { areEqualIntervals } from '@lib/utils/interval/areEqualIntervals'
import { usePresentState } from '@lib/ui/state/usePresentState'
import { useActiveSet } from '../ActiveSetProvider'
import { setEditorConfig } from './config'
import styled from 'styled-components'
import { SetItem } from '../SetItem'
import { getColor } from '@lib/ui/theme/getters'
import { interactive } from '@lib/ui/css/interactive'
import { pick } from '@lib/utils/record/pick'
import { editorSetFrame } from './editorSetFrame'

const SetPosition = styled.div`
  width: 100%;
  position: absolute;
  ${editorSetFrame};
`

const Item = styled(SetItem)`
  ${interactive};

  &:hover {
    background: ${getColor('foregroundExtra')};
  }

  height: 100%;
  outline: none;
`

export const Sets = () => {
  const [weekday] = useSelectedWeekday()
  const weekdayStartedAt = useStartOfWeekday(weekday)
  const sets = useWeekdaySets(weekday)

  const [currentSet, setActiveSet] = usePresentState(useActiveSet())

  const items = useMemo(() => {
    const { initialSet } = currentSet
    if (!initialSet) return sets

    return sets.filter((set) => !areEqualIntervals(set, initialSet))
  }, [currentSet, sets])

  return (
    <>
      {items.map((value, index) => {
        return (
          <SetPosition
            onClick={() => {
              setActiveSet({
                initialSet: value,
                ...pick(value, ['start', 'end', 'projectId']),
              })
            }}
            style={{
              top: setEditorConfig.msToPx(value.start - weekdayStartedAt),
              height: setEditorConfig.msToPx(value.end - value.start),
            }}
            key={index}
          >
            <Item projectId={value.projectId} />
          </SetPosition>
        )
      })}
    </>
  )
}
