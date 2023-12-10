import { useSetsExplorer } from './SetsExplorerProvider'
import { getSetsSum } from 'sets/helpers/getSetsSum'
import { SplineChart } from '@increaser/ui/charts/SplineChart'
import { normalize } from '@increaser/utils/math/normalize'
import { dayWith, daysGap } from './config'
import { VStack } from '@increaser/ui/layout/Stack'
import styled from 'styled-components'
import { verticalPadding } from '@increaser/ui/css/verticalPadding'

const Container = styled(VStack)`
  ${verticalPadding(4)};
`

export const SetsExplorerDaysChart = () => {
  const { days } = useSetsExplorer()
  const data = days.map((day) => getSetsSum(day.sets))
  const width = (days.length - 1) * dayWith + (days.length - 1) * daysGap

  return (
    <Container alignItems="center" style={{ width: width + dayWith }}>
      <SplineChart width={width} height={40} data={normalize(data)} />
    </Container>
  )
}
