import { HStack, VStack } from '@lib/ui/css/stack'
import { useState } from 'react'
import { useWeekday } from '@lib/ui/hooks/useWeekday'
import { getLastItem } from '@lib/utils/array/getLastItem'
import { ChartYAxis } from '@lib/ui/charts/ChartYAxis'
import { Text } from '@lib/ui/text'
import { formatDuration } from '@lib/utils/time/formatDuration'
import { ChartHorizontalGridLines } from '@lib/ui/charts/ChartHorizontalGridLines'
import { D_IN_WEEK } from '@lib/utils/time'
import { Spacer } from '@lib/ui/layout/Spacer'
import { HoverTracker } from '@lib/ui/base/HoverTracker'
import { getClosestItemIndex } from '@lib/utils/math/getClosestItemIndex'
import { useCurrentWeekVsBudgetColors } from './useCurrentWeekVsBudgetColors'
import { chartConfig } from './config'
import { useWorkBudgetData } from './useWorkBudgetData'
import { useWorkDoneData } from './useWorkDoneData'
import { normalizeDataArrays } from '@lib/utils/math/normalizeDataArrays'
import { SelectedDayInfo } from './SelectedDayInfo'
import { WeekChartXAxis } from './WeekChartXAxis'
import { TakeWholeSpaceAbsolutely } from '@lib/ui/css/takeWholeSpaceAbsolutely'
import { CurrentDayLine } from './CurrentDayLine'
import { ComparisonChartLines } from './ComparisonChartLines'
import { ComponentWithWidthProps } from '@lib/ui/props'

export const ComparisonChart = ({ width }: ComponentWithWidthProps) => {
  const weekday = useWeekday()

  const colors = useCurrentWeekVsBudgetColors()

  const workBudgetData = useWorkBudgetData()

  const workDoneData = useWorkDoneData()

  const [selectedDataPoint, setSelectedDataPoint] = useState<number>(weekday)

  const yData = [workBudgetData[0], getLastItem(workBudgetData)]
  const normalized = normalizeDataArrays({
    y: yData,
    workBudget: workBudgetData,
    workDone: workDoneData,
  })

  const contentWidth = width - chartConfig.expectedYAxisLabelWidth

  return (
    <>
      <HStack>
        <Spacer width={chartConfig.expectedYAxisLabelWidth} />
        <SelectedDayInfo
          expectedValue={workBudgetData[selectedDataPoint]}
          doneValue={workDoneData[selectedDataPoint]}
          width={contentWidth}
          index={selectedDataPoint}
        />
      </HStack>

      <HStack>
        <ChartYAxis
          expectedLabelWidth={chartConfig.expectedYAxisLabelWidth}
          renderLabel={(index) => (
            <Text key={index} size={12} color="supporting">
              {formatDuration(yData[index], 'min', {
                maxUnit: 'h',
                minUnit: 'h',
              })}
            </Text>
          )}
          data={normalized.y}
        />
        <VStack
          style={{
            position: 'relative',
            minHeight: chartConfig.chartHeight,
          }}
          fullWidth
        >
          <ChartHorizontalGridLines data={yData} />
          <ComparisonChartLines
            value={[
              { data: normalized.workBudget, color: colors.budget },
              { data: normalized.workDone, color: colors.done },
            ]}
            width={contentWidth}
          />
          <HoverTracker
            onChange={({ position }) => {
              setSelectedDataPoint(
                position ? getClosestItemIndex(D_IN_WEEK, position.x) : weekday,
              )
            }}
            render={({ props }) => <TakeWholeSpaceAbsolutely {...props} />}
          />
          <CurrentDayLine value={selectedDataPoint} />
        </VStack>
      </HStack>

      <HStack>
        <Spacer width={chartConfig.expectedYAxisLabelWidth} />
        <WeekChartXAxis value={selectedDataPoint} />
      </HStack>
    </>
  )
}
