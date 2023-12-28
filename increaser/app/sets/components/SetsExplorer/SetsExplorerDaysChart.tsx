import { useSetsExplorer } from './SetsExplorerProvider'
import { getSetsSum } from '@increaser/app/sets/helpers/getSetsSum'
import { SplineChart } from '@lib/ui/charts/SplineChart'
import { normalize } from '@lib/utils/math/normalize'
import { VStack } from '@lib/ui/layout/Stack'
import styled from 'styled-components'
import { verticalPadding } from '@lib/ui/css/verticalPadding'
import { setsExplorerConfig } from './config'

const Container = styled(VStack)`
  ${verticalPadding(4)};
`

export const SetsExplorerDaysChart = () => {
  const { days } = useSetsExplorer()
  const data = days.map((day) => getSetsSum(day.sets))
  const width =
    (days.length - 1) *
    (setsExplorerConfig.dayWith + setsExplorerConfig.daysGap)

  return (
    <Container
      alignItems="center"
      style={{ width: width + setsExplorerConfig.dayWith }}
    >
      <SplineChart width={width} height={40} data={normalize(data)} />
    </Container>
  )
}
