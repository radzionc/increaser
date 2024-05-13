import { LineChartItemInfo } from '@lib/ui/charts/LineChart/LineChartItemInfo'
import { TimeStatistic } from './TimeStatistic'
import { useCurrentWeekVsBudgetColors } from './useCurrentWeekVsBudgetColors'
import styled from 'styled-components'
import { D_IN_WEEK } from '@lib/utils/time'
import { ComponentWithWidthProps } from '@lib/ui/props'

const Container = styled.div`
  font-size: 14px;
  display: grid;
  grid-template-columns: auto auto;
  gap: 4px;
`

type SelectedDayInfoProps = ComponentWithWidthProps & {
  expectedValue: number
  doneValue?: number
  index: number
}

export const SelectedDayInfo = ({
  expectedValue,
  doneValue,
  width,
  index,
}: SelectedDayInfoProps) => {
  const colors = useCurrentWeekVsBudgetColors()

  return (
    <>
      <LineChartItemInfo
        itemIndex={index}
        isVisible={true}
        containerWidth={width}
        dataPointsNumber={D_IN_WEEK}
      >
        <Container>
          <TimeStatistic name="Done" value={doneValue} color={colors.done} />
          <TimeStatistic
            name="Expected"
            value={expectedValue}
            color={colors.budget}
          />
        </Container>
      </LineChartItemInfo>
    </>
  )
}
