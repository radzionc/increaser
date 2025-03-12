import { interactive } from '@lib/ui/css/interactive'
import { usePresentState } from '@lib/ui/state/usePresentState'
import { getColor } from '@lib/ui/theme/getters'
import { useStartOfWeekday } from '@lib/ui/time/hooks/useStartOfWeekday'
import { useSelectedWeekday } from '@lib/ui/time/SelectedWeekdayProvider'
import { areEqualIntervals } from '@lib/utils/interval/areEqualIntervals'
import { pick } from '@lib/utils/record/pick'
import { useWeekdaySets } from '@product/ui/sets/hooks/useWeekdaySets'
import { useMemo } from 'react'
import styled, { css } from 'styled-components'

import { useActiveSet } from '../ActiveSetProvider'
import { SetItem } from '../SetItem'

import { useActiveControl } from './ActiveControlProvider'
import { setEditorConfig } from './config'
import { editorSetFrame } from './editorSetFrame'

const SetPosition = styled.div`
  width: 100%;
  position: absolute;
  ${editorSetFrame};
`

const Item = styled(SetItem)<{ isInteractive?: boolean }>`
  ${({ isInteractive }) =>
    isInteractive &&
    css`
      ${interactive};

      &:hover {
        background: ${getColor('foregroundExtra')};
      }
    `};

  height: 100%;
  outline: none;
`

export const Sets = () => {
  const [weekday] = useSelectedWeekday()
  const weekdayStartedAt = useStartOfWeekday(weekday)
  const sets = useWeekdaySets(weekday)

  const [currentSet, setActiveSet] = usePresentState(useActiveSet())

  const [activeControl] = useActiveControl()

  const items = useMemo(() => {
    const { initialSet } = currentSet
    if (!initialSet) return sets

    return sets.filter((set) => !areEqualIntervals(set, initialSet))
  }, [currentSet, sets])

  const isInteractive = !activeControl

  return (
    <>
      {items.map((value, index) => {
        return (
          <SetPosition
            onClick={
              isInteractive
                ? () => {
                    setActiveSet({
                      initialSet: value,
                      ...pick(value, ['start', 'end', 'projectId']),
                    })
                  }
                : undefined
            }
            style={{
              top: setEditorConfig.msToPx(value.start - weekdayStartedAt),
              height: setEditorConfig.msToPx(value.end - value.start),
            }}
            key={index}
          >
            <Item isInteractive={isInteractive} projectId={value.projectId} />
          </SetPosition>
        )
      })}
    </>
  )
}
