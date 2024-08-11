import { VStack } from '@lib/ui/layout/Stack'
import styled from 'styled-components'
import { Text } from '@lib/ui/text'
import { formatDuration } from '@lib/utils/time/formatDuration'
import { EmphasizeNumbers } from '@lib/ui/text/EmphasizeNumbers'
import { sum } from '@lib/utils/array/sum'
import { toPercents } from '@lib/utils/toPercents'
import { usePresentState } from '@lib/ui/state/usePresentState'
import { useActiveItemIndex } from '@lib/ui/list/ActiveItemIndexProvider'
import { useDataPointBreakdown } from '../../hooks/useDataPointBreakdown'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { useTrackedProjects } from '../../projects/TrackedProjectsProvider'

const ProjectRow = styled.div`
  width: 100%;
  display: grid;
  gap: 8px;
  grid-template-columns: auto auto 128px 80px 40px;
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

const Indicator = styled.div`
  ${borderRadius.xs};
  ${sameDimensions(14)};
`

export const DataPointBreakdown = () => {
  const [index] = usePresentState(useActiveItemIndex())
  const projects = useTrackedProjects()

  const items = useDataPointBreakdown(index)

  const total = sum(items.map((item) => item.value))

  return (
    <VStack gap={8}>
      {items.map(({ key, value }) => {
        const { emoji, name, color } = projects[key]

        return (
          <ProjectRow key={key}>
            <Indicator style={{ background: color.toCssValue() }} />
            <Text color="contrast">{emoji}</Text>
            <VStack fullWidth>
              <Text cropped>{name}</Text>
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
