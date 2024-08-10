import { VStack } from '@lib/ui/layout/Stack'
import { Entry } from '@lib/utils/entities/Entry'
import { useMemo } from 'react'
import { useTrackedTimeReport } from '../../state/TrackedTimeReportContext'
import { order } from '@lib/utils/array/order'
import styled from 'styled-components'
import { useTrackedTime } from '../../state/TrackedTimeContext'
import { Text } from '@lib/ui/text'
import { EmojiTextPrefix } from '@lib/ui/text/EmojiTextPrefix'
import { formatDuration } from '@lib/utils/time/formatDuration'
import { EmphasizeNumbers } from '@lib/ui/text/EmphasizeNumbers'
import { sum } from '@lib/utils/array/sum'
import { toPercents } from '@lib/utils/toPercents'
import { usePresentState } from '@lib/ui/state/usePresentState'
import { useActiveItemIndex } from '@lib/ui/list/ActiveItemIndexProvider'

const ProjectRow = styled.div`
  width: 100%;
  display: grid;
  gap: 8px;
  grid-template-columns: 128px 80px 40px;
  align-items: center;
  font-size: 14px;

  > * {
    justify-self: end;
    font-weight: 600;

    &:first-child {
      justify-self: start;
      font-weight: 500;
    }
  }
`

export const DataPointBreakdown = () => {
  const [index] = usePresentState(useActiveItemIndex())
  const { projects } = useTrackedTime()
  const { projectsTimeSeries } = useTrackedTimeReport()

  const items = useMemo(() => {
    const result: Entry<string, number>[] = []

    Object.entries(projectsTimeSeries).forEach(([key, timeSeries]) => {
      const value = timeSeries[index]
      if (value) {
        result.push({
          key,
          value,
        })
      }
    })

    return order(result, (item) => item.value, 'desc')
  }, [index, projectsTimeSeries])

  const total = sum(items.map((item) => item.value))

  return (
    <VStack gap={8}>
      {items.map(({ key, value }) => {
        const { emoji, name } = projects[key]

        return (
          <ProjectRow key={key}>
            <VStack fullWidth>
              <Text cropped>
                <EmojiTextPrefix emoji={emoji} /> {name}
              </Text>
            </VStack>
            <Text>
              <EmphasizeNumbers
                value={formatDuration(value, 's', {
                  minUnit: 'min',
                  maxUnit: 'h',
                })}
              />
            </Text>
            <Text>
              <EmphasizeNumbers value={toPercents(value / total, 'round')} />
            </Text>
          </ProjectRow>
        )
      })}
    </VStack>
  )
}
