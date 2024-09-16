import { Switch } from '@lib/ui/inputs/Switch'
import { SeparatedByLine } from '@lib/ui/layout/SeparatedByLine'
import {
  focusNotifications,
  useFocusNotifications,
} from './state/focusNotifications'
import { makeRecord } from '@lib/utils/record/makeRecord'
import { usePermission } from 'react-use'
import { ShyWarningBlock } from '@lib/ui/status/ShyWarningBlock'

export const FocusNotificationsToggles = () => {
  const permission = usePermission({ name: 'notifications' })
  const [value, setValue] = useFocusNotifications()

  return (
    <SeparatedByLine gap={8}>
      {permission === 'denied' ? (
        <ShyWarningBlock title="Enable browser notifications">
          To receive focus notifications, please enable browser notifications.
        </ShyWarningBlock>
      ) : (
        <Switch
          onChange={(value) => {
            setValue(makeRecord(focusNotifications, () => value))
          }}
          value={Object.values(value).every((v) => v)}
          label="Enable all"
        />
      )}
    </SeparatedByLine>
  )
}
