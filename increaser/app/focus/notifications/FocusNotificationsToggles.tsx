import { Switch } from '@lib/ui/inputs/Switch'
import { SeparatedByLine } from '@lib/ui/layout/SeparatedByLine'
import {
  focusNotifications,
  useFocusNotifications,
} from './state/focusNotifications'
import { makeRecord } from '@lib/utils/record/makeRecord'
import { usePermission } from 'react-use'
import { ShyWarningBlock } from '@lib/ui/status/ShyWarningBlock'
import { useRequestNotificationPermissionMutation } from '@lib/ui/notifications/hooks/useRequestNotificationPermissionMutation'

export const FocusNotificationsToggles = () => {
  const permission = usePermission({ name: 'notifications' })
  const [value, setValue] = useFocusNotifications()
  const { mutate: requestPermission } =
    useRequestNotificationPermissionMutation()

  return (
    <SeparatedByLine gap={8}>
      {permission === 'denied' ? (
        <ShyWarningBlock title="Enable browser notifications">
          To receive focus notifications, please enable browser notifications.
        </ShyWarningBlock>
      ) : (
        <Switch
          onChange={(value) => {
            if (!value || permission === 'granted') {
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
    </SeparatedByLine>
  )
}
