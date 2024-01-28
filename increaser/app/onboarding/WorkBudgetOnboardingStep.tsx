import { VStack } from '@lib/ui/layout/Stack'

import { useEffect, useMemo, useState } from 'react'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { getLastItem } from '@lib/utils/array/getLastItem'
import { OnboardingStepView } from './OnboardingStepView'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { useTheme } from 'styled-components'
import { WorkBudgetInput } from '@increaser/ui/workBudget/WorkBudgetInput'
import { getWorkdayColor } from '@increaser/ui/workBudget/getWorkdayColor'
import { getWeekendColor } from '@increaser/ui/workBudget/getWeekendColor'
import { useUpdateUserMutation } from '../user/mutations/useUpdateUserMutation'
import { getWeekTimeAllocation } from '../weekTimeAllocation/helpers/getWeekTimeAllocation'
import { BarChart } from '@lib/ui/charts/BarChart'
import { Text } from '@lib/ui/text'
import { getShortWeekday } from '@lib/utils/time'
import { formatDuration } from '@lib/utils/time/formatDuration'
import { sum } from '@lib/utils/array/sum'

export const WorkBudgetOnboardingStep = () => {
  const { weekTimeAllocation } = useAssertUserState()

  const { mutate: updateUser } = useUpdateUserMutation()

  const [workdayHours, setWorkdayHours] = useState(
    convertDuration(weekTimeAllocation[0], 'min', 'h'),
  )
  const [weekendHours, setWeekendHours] = useState(
    convertDuration(getLastItem(weekTimeAllocation), 'min', 'h'),
  )

  const newWeekTimeAllocation = useMemo(
    () =>
      getWeekTimeAllocation(
        convertDuration(workdayHours, 'h', 'min'),
        convertDuration(weekendHours, 'h', 'min'),
      ),
    [workdayHours, weekendHours],
  )

  useEffect(() => {
    const hasValueChanged = newWeekTimeAllocation.some(
      (value, index) => value !== weekTimeAllocation[index],
    )
    if (!hasValueChanged) return

    const timeout = setTimeout(() => {
      updateUser({
        weekTimeAllocation: newWeekTimeAllocation,
      })
    }, 500)

    return () => clearTimeout(timeout)
  }, [newWeekTimeAllocation, updateUser, weekTimeAllocation])

  const theme = useTheme()

  return (
    <OnboardingStepView>
      <VStack gap={40}>
        <Text height="large">
          Set your work budget by selecting the desired number of working hours
          for weekdays and weekends. This ensures a balanced approach to
          managing your time and commitments effectively.
        </Text>
        <VStack style={{ maxWidth: 480 }} gap={60}>
          <VStack gap={28}>
            <WorkBudgetInput
              value={workdayHours}
              onChange={setWorkdayHours}
              color={getWorkdayColor(theme)}
              name="Workday"
            />
            <WorkBudgetInput
              value={weekendHours}
              onChange={setWeekendHours}
              color={getWeekendColor(theme)}
              name="Weekend"
            />
          </VStack>
          <VStack gap={20}>
            <BarChart
              height={160}
              items={newWeekTimeAllocation.map((value, index) => {
                return {
                  value,
                  label: <Text>{getShortWeekday(index)}</Text>,
                  color:
                    index < 5 ? getWorkdayColor(theme) : getWeekendColor(theme),

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
            <Text
              style={{ alignSelf: 'end' }}
              color="contrast"
              weight="semibold"
              size={20}
            >
              {convertDuration(sum(newWeekTimeAllocation), 'min', 'h')} hours /
              week
            </Text>
          </VStack>
        </VStack>
      </VStack>
    </OnboardingStepView>
  )
}
