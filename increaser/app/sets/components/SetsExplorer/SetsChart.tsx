import { ElementSizeAware } from '@lib/ui/base/ElementSizeAware'
import { useSetsExplorer } from './SetsExplorerProvider'
import styled from 'styled-components'
import { SplineChart } from '@lib/ui/charts/SplineChart'
import { match } from '@lib/utils/match'
import { useMemo } from 'react'
import { isEmpty } from '@lib/utils/array/isEmpty'
import { getSetsSum } from '../../helpers/getSetsSum'
import { normalize } from '@lib/utils/math/normalize'
import { getBlocks } from '@increaser/entities-utils/block'
import { convertDuration } from '@lib/utils/time/convertDuration'

const Container = styled.div``

export const SetsChart = () => {
  const { currentStatistic, days } = useSetsExplorer()

  const daysWithSets = useMemo(
    () => days.filter((day) => !isEmpty(day.sets)),
    [days],
  )

  if (isEmpty(daysWithSets)) return null

  console.log(
    'blocks:',
    normalize(days.map((day) => getBlocks(day.sets).length)),
  )

  return (
    <ElementSizeAware
      render={({ setElement, size }) => {
        return (
          <Container ref={setElement}>
            {size && (
              <SplineChart
                width={size.width}
                height={80}
                data={match(currentStatistic, {
                  startedWorkAt: () =>
                    normalize(
                      days.map((day) =>
                        isEmpty(day.sets)
                          ? 0
                          : convertDuration(1, 'd', 'ms') -
                            (day.sets[0].start - day.startedAt),
                      ),
                    ),
                  finishedWorkAt: () =>
                    normalize(
                      days.map((day) =>
                        isEmpty(day.sets)
                          ? 0
                          : convertDuration(1, 'd', 'ms') -
                            (day.sets[day.sets.length - 1].end - day.startedAt),
                      ),
                    ),
                  block: () =>
                    normalize(
                      days.map((day) =>
                        isEmpty(day.sets)
                          ? 0
                          : getSetsSum(day.sets) / getBlocks(day.sets).length,
                      ),
                    ),
                  total: () =>
                    normalize(days.map((day) => getSetsSum(day.sets))),
                })}
              />
            )}
          </Container>
        )
      }}
    />
  )
}
