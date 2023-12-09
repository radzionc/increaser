import {
  getPrimaryGoalColor,
  primaryGoalIcon,
  primaryGoalName,
} from 'capacity/PrimaryGoal'
import styled, { useTheme } from 'styled-components'
import { Menu } from '@increaser/ui/menu'
import { MenuOption, MenuOptionProps } from '@increaser/ui/menu/MenuOption'
import { HStack } from '@increaser/ui/layout/Stack'
import { Text } from '@increaser/ui/text'
import { useUpdateUserMutation } from 'user/mutations/useUpdateUserMutation'
import { useAssertUserState } from 'user/state/UserStateContext'
import { UnstyledButton } from '@increaser/ui/buttons/UnstyledButton'
import { transition } from '@increaser/ui/css/transition'
import { PrimaryGoal, primaryGoals } from '@increaser/entities/User'
import { getColor } from '@increaser/ui/theme/getters'

const Container = styled(UnstyledButton)`
  background: ${getColor('foreground')};
  padding: 8px 12px;
  border-radius: 8px;

  ${transition}

  :hover {
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
