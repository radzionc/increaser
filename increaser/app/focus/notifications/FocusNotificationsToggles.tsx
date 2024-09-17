import { Switch } from '@lib/ui/inputs/Switch'
import {
  focusNotifications,
  useFocusNotifications,
} from './state/focusNotifications'
import { makeRecord } from '@lib/utils/record/makeRecord'
import { ShyWarningBlock } from '@lib/ui/status/ShyWarningBlock'
import { useRequestNotificationPermissionMutation } from '@lib/ui/notifications/hooks/useRequestNotificationPermissionMutation'
import { VStack } from '@lib/ui/css/stack'
import { ManageFocusNotification } from './ManageFocusNotification'
import { focusNotificationsConfig } from './config'
import styled from 'styled-components'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { useNotificationPermission } from '@lib/ui/notifications/hooks/useNotificationPermission'

const PrimarySwitch = styled(Switch)`
  padding: ${toSizeUnit(
    focusNotificationsConfig.horizontalPadding +
      focusNotificationsConfig.borderWidth,
  )};
`

export const FocusNotificationsToggles = () => {
  const permission = useNotificationPermission()
  const [value, setValue] = useFocusNotifications()
  const { mutate: requestPermission } =
    useRequestNotificationPermissionMutation()

  return (
    <VStack gap={8}>
      {permission === 'denied' ? (
        <ShyWarningBlock title="Enable browser notifications">
          To receive focus notifications, please enable browser notifications.
        </ShyWarningBlock>
      ) : (
        <PrimarySwitch
          onChange={(value) => {
            if (!value) {
              setValue(makeRecord(focusNotifications, () => value))
            } else {
              requestPermission(undefined, {
                onSuccess: () =>
                  setValue(makeRecord(focusNotifications, () => true)),
              })
            }
          }}
          value={Object.values(value).every((v) => v)}
          label="Enable all"
        />
      )}
      <VStack gap={12}>
        {focusNotifications.map((value) => (
          <ManageFocusNotification key={value} value={value} />
        ))}
      </VStack>
    </VStack>
  )
}
