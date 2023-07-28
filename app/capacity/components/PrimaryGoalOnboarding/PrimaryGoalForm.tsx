import {
  getPrimaryGoalColor,
  primaryGoalIcon,
  primaryGoalName,
  primaryGoals,
} from 'capacity/PrimaryGoal'
import { useTheme } from 'styled-components'
import { HStack, VStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'
import { useUpdateUserMutation } from 'user/mutations/useUpdateUserMutation'
import { useAssertUserState } from 'user/state/UserStateContext'
import { LargeSelectOption } from 'ui/LargeSelectOption'

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
          onSelect={() => updateUser({ primaryGoal: goal })}
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
