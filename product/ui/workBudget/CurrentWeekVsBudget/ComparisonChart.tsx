import { HoverTracker } from '@lib/ui/base/HoverTracker'
import { ChartHorizontalGridLines } from '@lib/ui/charts/ChartHorizontalGridLines'
import { ChartYAxis } from '@lib/ui/charts/ChartYAxis'
import { HStack, VStack } from '@lib/ui/css/stack'
import { TakeWholeSpaceAbsolutely } from '@lib/ui/css/takeWholeSpaceAbsolutely'
import { useWeekday } from '@lib/ui/hooks/useWeekday'
import { Spacer } from '@lib/ui/layout/Spacer'
import { WidthProp } from '@lib/ui/props'
import { Text } from '@lib/ui/text'
import { getLastItem } from '@lib/utils/array/getLastItem'
import { normalizeDataArrays } from '@lib/utils/math/normalizeDataArrays'
import { D_IN_WEEK } from '@lib/utils/time'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { formatDuration } from '@lib/utils/time/formatDuration'
import { generateYLabels } from '@product/ui/charts/utils/generateYLabels'
import { useMemo, useState } from 'react'

import { ComparisonChartLines } from './ComparisonChartLines'
import { chartConfig } from './config'
import { CurrentDayHighlight } from './CurrentDayHighlight'
import { SelectedDayInfo } from './SelectedDayInfo'
import { useCurrentWeekVsBudgetColors } from './useCurrentWeekVsBudgetColors'
import { useWorkBudgetData } from './useWorkBudgetData'
import { useWorkDoneData } from './useWorkDoneData'
import { WeekChartXAxis } from './WeekChartXAxis'

export const ComparisonChart = ({ width }: WidthProp) => {
  const weekday = useWeekday()

  const colors = useCurrentWeekVsBudgetColors()

  const workBudgetData = useWorkBudgetData()

  const workDoneData = useWorkDoneData()

  const [selectedDataPoint, setSelectedDataPoint] = useState<number>(weekday)

  const yLabels = useMemo(() => {
    const maxValue = Math.max(
      getLastItem(workBudgetData),
      getLastItem(workDoneData),
    )

    return generateYLabels({
      maxValue,
      stepSizes: [1, 5, 10].map((value) => convertDuration(value, 'h', 'min')),
    })
  }, [workBudgetData, workDoneData])

  const normalized = normalizeDataArrays({
    yLabels,
    workBudget: workBudgetData,
    workDone: workDoneData,
  })

  const contentWidth = width - chartConfig.expectedYAxisLabelWidth

  return (
    <>
      <HStack>
        <Spacer width={chartConfig.expectedYAxisLabelWidth} />
        <SelectedDayInfo
          expectedValue={workBudgetData[selectedDataPoint + 1]}
          doneValue={
            workDoneData[selectedDataPoint + 1] ?? getLastItem(workDoneData)
          }
          width={contentWidth}
          index={selectedDataPoint}
        />
      </HStack>

      <HStack>
        <ChartYAxis
          style={{
            minWidth: chartConfig.expectedYAxisLabelWidth,
          }}
          renderLabel={(index) => (
            <Text key={index} size={12} color="supporting">
              {formatDuration(yLabels[index], 'min', {
                maxUnit: 'h',
                minUnit: 'h',
              })}
            </Text>
          )}
          data={normalized.yLabels}
        />
        <VStack
          style={{
            position: 'relative',
            minHeight: chartConfig.chartHeight,
          }}
          fullWidth
        >
          <CurrentDayHighlight value={selectedDataPoint} />
          <ChartHorizontalGridLines data={normalized.yLabels} />
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
                position ? Math.floor(position.x * D_IN_WEEK) : weekday,
              )
            }}
            render={({ props }) => <TakeWholeSpaceAbsolutely {...props} />}
          />
        </VStack>
      </HStack>

      <HStack>
        <Spacer width={chartConfig.expectedYAxisLabelWidth} />
        <WeekChartXAxis value={selectedDataPoint} />
      </HStack>
    </>
  )
}
