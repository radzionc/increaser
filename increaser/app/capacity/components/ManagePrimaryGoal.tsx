import {
  getPrimaryGoalColor,
  primaryGoalIcon,
  primaryGoalName,
} from '@increaser/app/capacity/PrimaryGoal'
import styled, { useTheme } from 'styled-components'
import { Menu } from '@lib/ui/menu'
import { MenuOption, MenuOptionProps } from '@lib/ui/menu/MenuOption'
import { HStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import { useUpdateUserMutation } from '@increaser/app/user/mutations/useUpdateUserMutation'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { UnstyledButton } from '@lib/ui/buttons/UnstyledButton'
import { transition } from '@lib/ui/css/transition'
import { PrimaryGoal, primaryGoals } from '@increaser/entities/User'
import { getColor } from '@lib/ui/theme/getters'

const Container = styled(UnstyledButton)`
  background: ${getColor('foreground')};
  padding: 8px 12px;
  border-radius: 8px;

  ${transition}

  &:hover {
    background: ${getColor('mist')};
  }
`

export const ManagePrimaryGoal = () => {
  const { primaryGoal } = useAssertUserState()

  const { mutate: updateUser } = useUpdateUserMutation()
  const theme = useTheme()

  return (
    <Menu
      title="Productivity Goal"
      renderOpener={(props) => (
        <Container {...props}>
          <HStack alignItems="center" gap={8}>
            <Text
              style={{
                display: 'flex',
                color: getPrimaryGoalColor(primaryGoal, theme).toCssValue(),
              }}
              size={18}
            >
              {primaryGoalIcon[primaryGoal]}
            </Text>
            <Text size={16}>{primaryGoalName[primaryGoal]}</Text>
          </HStack>
        </Container>
      )}
      renderContent={({ view, onClose }) => {
        const options: MenuOptionProps[] = primaryGoals.map((goal) => ({
          icon: (
            <Text
              style={{
                display: 'flex',
                color: getPrimaryGoalColor(goal, theme).toCssValue(),
              }}
            >
              {primaryGoalIcon[goal]}
            </Text>
          ),
          text: primaryGoalName[goal],
          onSelect: () => updateUser({ primaryGoal: goal as PrimaryGoal }),
        }))

        return options.map(({ text, icon, onSelect }) => (
          <MenuOption
            view={view}
            text={text}
            key={text}
            icon={icon}
            onSelect={() => {
              onClose()
              onSelect()
            }}
          />
        ))
      }}
    />
  )
}
