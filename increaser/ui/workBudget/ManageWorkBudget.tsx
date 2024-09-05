import { VStack } from '@lib/ui/css/stack'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { useTheme } from 'styled-components'
import { WorkBudgetInput } from '@increaser/ui/workBudget/WorkBudgetInput'
import { getWorkdayColor } from '@increaser/ui/workBudget/getWorkdayColor'
import { getWeekendColor } from '@increaser/ui/workBudget/getWeekendColor'
import { useUpdateUserMutation } from '@increaser/ui/user/mutations/useUpdateUserMutation'
import { BarChart } from '@lib/ui/charts/BarChart'
import { Text } from '@lib/ui/text'
import { getShortWeekday } from '@lib/utils/time'
import { formatDuration } from '@lib/utils/time/formatDuration'
import { SectionTitle } from '@lib/ui/text/SectionTitle'
import { Panel } from '@lib/ui/css/panel'
import { InputDebounce } from '@lib/ui/inputs/InputDebounce'
import { getWorkBudgetTotal } from '@increaser/entities-utils/workBudget/getWorkBudgetTotal'
import { workdaysNumber } from '@lib/utils/time/workweek'
import { useDaysBudget } from '@increaser/ui/workBudget/hooks/useDaysBudget'

export const ManageWorkBudget = () => {
  const { workdayHours, weekendHours } = useAssertUserState()

  const { mutate: updateUser } = useUpdateUserMutation()

  const theme = useTheme()

  const workBudgetTotal = getWorkBudgetTotal({
    workdayHours,
    weekendHours,
  })

  const formattedWorkdBudgetTotal = formatDuration(workBudgetTotal, 'h', {
    maxUnit: 'h',
    kind: 'long',
  })

  const daysBudget = useDaysBudget()

  return (
    <Panel>
      <VStack fullHeight gap={20}>
        <SectionTitle>
          My preference ~ {formattedWorkdBudgetTotal} / week
        </SectionTitle>
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
              const color =
                index < workdaysNumber
                  ? getWorkdayColor(theme)
                  : getWeekendColor(theme)
              return {
                value,
                label: <Text>{getShortWeekday(index)}</Text>,
                color,

                renderValue:
                  value > 0
                    ? () => (
                        <Text>
                          {formatDuration(value, 'min', { maxUnit: 'h' })}
                        </Text>
                      )
                    : undefined,
              }
            })}
          />
        </VStack>
      </VStack>
    </Panel>
  )
}
