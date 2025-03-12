import { BarChart } from '@lib/ui/charts/BarChart'
import { HStack, VStack } from '@lib/ui/css/stack'
import { InputDebounce } from '@lib/ui/inputs/InputDebounce'
import { Text } from '@lib/ui/text'
import { getShortWeekday } from '@lib/utils/time'
import { formatDuration } from '@lib/utils/time/formatDuration'
import { getWorkBudgetTotal } from '@product/entities-utils/workBudget/getWorkBudgetTotal'
import { useUpdateUserMutation } from '@product/ui/user/mutations/useUpdateUserMutation'
import { useUser } from '@product/ui/user/state/user'
import { getWeekendColor } from '@product/ui/workBudget/getWeekendColor'
import { getWorkdayColor } from '@product/ui/workBudget/getWorkdayColor'
import { useDaysBudget } from '@product/ui/workBudget/hooks/useDaysBudget'
import { WorkBudgetInput } from '@product/ui/workBudget/WorkBudgetInput'
import { useTheme } from 'styled-components'

import { TextConnector } from '../preferences/TextConnector'

export const ManageWorkBudget = () => {
  const { workdayHours, weekendHours, weekends } = useUser()

  const { mutate: updateUser } = useUpdateUserMutation()

  const theme = useTheme()

  const workBudgetTotal = getWorkBudgetTotal({
    workdayHours,
    weekendHours,
    weekends,
  })

  const formattedWorkdBudgetTotal = formatDuration(workBudgetTotal, 'h', {
    maxUnit: 'h',
    kind: 'l',
  })

  const daysBudget = useDaysBudget()

  return (
    <VStack gap={20}>
      <HStack alignItems="center" gap={8}>
        <TextConnector>Work budget:</TextConnector>

        <Text as="span" color="contrast">
          {formattedWorkdBudgetTotal} / week
        </Text>
      </HStack>

      <VStack style={{ flex: 1 }} justifyContent="space-between" gap={40}>
        <VStack gap={28}>
          <InputDebounce
            value={workdayHours}
            onChange={(workdayHours) => updateUser({ workdayHours })}
            render={({ value, onChange }) => (
              <WorkBudgetInput
                value={value}
                onChange={onChange}
                color={getWorkdayColor(theme)}
                name="Workday"
              />
            )}
          />
          <InputDebounce
            value={weekendHours}
            onChange={(weekendHours) => updateUser({ weekendHours })}
            render={({ value, onChange }) => (
              <WorkBudgetInput
                value={value}
                onChange={onChange}
                color={getWeekendColor(theme)}
                name="Weekend"
              />
            )}
          />
        </VStack>
        <BarChart
          height={160}
          items={daysBudget.map((value, index) => {
            const color = weekends.includes(index)
              ? getWeekendColor(theme)
              : getWorkdayColor(theme)

            return {
              value,
              label: <Text>{getShortWeekday(index)}</Text>,
              color,

              renderValue:
                value > 0
                  ? () => (
                      <Text>
                        {formatDuration(value, 'h', { maxUnit: 'h' })}
                      </Text>
                    )
                  : undefined,
            }
          })}
        />
      </VStack>
    </VStack>
  )
}
