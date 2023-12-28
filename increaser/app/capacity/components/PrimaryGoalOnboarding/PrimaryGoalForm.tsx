import {
  getPrimaryGoalColor,
  primaryGoalIcon,
  primaryGoalName,
} from '@increaser/app/capacity/PrimaryGoal'
import { useTheme } from 'styled-components'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import { useUpdateUserMutation } from '@increaser/app/user/mutations/useUpdateUserMutation'
import { useAssertUserState } from '@increaser/app/user/state/UserStateContext'
import { LargeSelectOption } from '@increaser/app/ui/LargeSelectOption'
import { PrimaryGoal, primaryGoals } from '@increaser/entities/User'

export const PrimaryGoalForm = () => {
  const { primaryGoal } = useAssertUserState()

  const { mutate: updateUser } = useUpdateUserMutation()

  const theme = useTheme()

  return (
    <VStack fullWidth gap={8}>
      {primaryGoals.map((goal) => (
        <LargeSelectOption
          color={getPrimaryGoalColor(goal, theme)}
          value={primaryGoal}
          groupName="primaryGoal"
          isSelected={goal === primaryGoal}
          onSelect={() => updateUser({ primaryGoal: goal as PrimaryGoal })}
          key={goal}
        >
          <HStack alignItems="center" justifyContent="space-between">
            <Text>{primaryGoalName[goal]}</Text>
            <Text
              style={{ color: getPrimaryGoalColor(goal, theme).toCssValue() }}
              size={24}
            >
              {primaryGoalIcon[goal]}
            </Text>
          </HStack>
        </LargeSelectOption>
      ))}
    </VStack>
  )
}
