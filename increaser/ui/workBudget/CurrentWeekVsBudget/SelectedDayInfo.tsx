import { ChartItemInfo } from '@lib/ui/charts/ChartItemInfo'
import { TimeStatistic } from './TimeStatistic'
import { useCurrentWeekVsBudgetColors } from './useCurrentWeekVsBudgetColors'
import styled from 'styled-components'
import { D_IN_WEEK } from '@lib/utils/time'
import { WidthProp } from '@lib/ui/props'

const Container = styled.div`
  font-size: 14px;
  display: grid;
  grid-template-columns: auto auto;
  gap: 4px;
`

type SelectedDayInfoProps = WidthProp & {
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
      <ChartItemInfo
        itemIndex={index * 2 + 1}
        isVisible={true}
        containerWidth={width}
        dataPointsNumber={D_IN_WEEK * 2 + 1}
      >
        <Container>
          <TimeStatistic name="Done" value={doneValue} color={colors.done} />
          <TimeStatistic
            name="Expected"
            value={expectedValue}
            color={colors.budget}
          />
          <TimeStatistic
            name="Difference"
            isSigned
            value={(doneValue || 0) - expectedValue}
          />
        </Container>
      </ChartItemInfo>
    </>
  )
}
