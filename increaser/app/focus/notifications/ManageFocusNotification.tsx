import {
  ComponentWithActiveState,
  ComponentWithValueProps,
} from '@lib/ui/props'
import {
  FocusNotification,
  focusNotificationDescription,
  focusNotificationEmoji,
  focusNotificationName,
  useFocusNotifications,
} from './state/focusNotifications'
import { HStack, vStack } from '@lib/ui/css/stack'
import styled, { css } from 'styled-components'
import { interactive } from '@lib/ui/css/interactive'
import { getColor, matchColor } from '@lib/ui/theme/getters'
import { SwitchControl } from '@lib/ui/inputs/Switch/SwitchControl'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { SwitchContainer } from '@lib/ui/inputs/Switch/SwitchContainer'
import { InvisibleHTMLCheckbox } from '@lib/ui/inputs/InvisibleHTMLCheckbox'
import { useRequestNotificationPermissionMutation } from '@lib/ui/notifications/hooks/useRequestNotificationPermissionMutation'
import { Text } from '@lib/ui/text'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { focusNotificationsConfig } from './config'

const Title = styled(Text)`
  font-size: 16px;
`

const Wrapper = styled.label<ComponentWithActiveState>`
  ${interactive};

  ${vStack({
    gap: 12,
  })}

  ${borderRadius.m};
  padding: ${toSizeUnit(focusNotificationsConfig.horizontalPadding)};
  border: ${toSizeUnit(focusNotificationsConfig.borderWidth)} solid
    ${matchColor('isActive', {
      true: 'textPrimary',
      false: 'mist',
    })};

  ${({ isActive }) =>
    !isActive &&
    css`
      &:hover {
        border-color: ${getColor('mistExtra')};
      }
    `}

  &:hover ${Title} {
    color: ${getColor('contrast')};
  }

  &:hover ${SwitchControl} {
    transform: scale(1.08);
  }
`

export const ManageFocusNotification = ({
  value,
}: ComponentWithValueProps<FocusNotification>) => {
  const [notifications, setNotifications] = useFocusNotifications()
  const { mutate: requestPermission } =
    useRequestNotificationPermissionMutation()

  const isEnabled = notifications[value]
  const size = 'm'

  return (
    <Wrapper isActive={isEnabled}>
      <InvisibleHTMLCheckbox
        value={isEnabled}
        onChange={(isEnabled) => {
          if (!isEnabled) {
            setNotifications((prev) => ({
              ...prev,
              [value]: isEnabled,
            }))
          } else {
            requestPermission(undefined, {
              onSuccess: () =>
                setNotifications((prev) => ({
                  ...prev,
                  [value]: isEnabled,
                })),
            })
          }
        }}
      />
      <HStack alignItems="center" gap={8}>
        <SwitchContainer size={size} isActive={isEnabled}>
          <SwitchControl isActive={isEnabled} size={size} />
        </SwitchContainer>
        <Title size={16}>{focusNotificationName[value]}</Title>
        <Text size={16} color="contrast">
          {focusNotificationEmoji[value]}
        </Text>
      </HStack>
      <Text color="supporting" height="l">
        {focusNotificationDescription[value]}
      </Text>
    </Wrapper>
  )
}
