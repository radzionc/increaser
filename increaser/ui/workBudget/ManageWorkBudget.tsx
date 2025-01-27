import { HStack, VStack } from '@lib/ui/css/stack'
import { useUser } from '@increaser/ui/user/state/user'
import { useTheme } from 'styled-components'
import { WorkBudgetInput } from '@increaser/ui/workBudget/WorkBudgetInput'
import { getWorkdayColor } from '@increaser/ui/workBudget/getWorkdayColor'
import { getWeekendColor } from '@increaser/ui/workBudget/getWeekendColor'
import { useUpdateUserMutation } from '@increaser/ui/user/mutations/useUpdateUserMutation'
import { BarChart } from '@lib/ui/charts/BarChart'
import { Text } from '@lib/ui/text'
import { getShortWeekday } from '@lib/utils/time'
import { formatDuration } from '@lib/utils/time/formatDuration'
import { InputDebounce } from '@lib/ui/inputs/InputDebounce'
import { getWorkBudgetTotal } from '@increaser/entities-utils/workBudget/getWorkBudgetTotal'
import { useDaysBudget } from '@increaser/ui/workBudget/hooks/useDaysBudget'
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
