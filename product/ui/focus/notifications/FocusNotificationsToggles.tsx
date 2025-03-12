import { VStack } from '@lib/ui/css/stack'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { Switch } from '@lib/ui/inputs/Switch'
import { useRequestNotificationPermissionMutation } from '@lib/ui/notifications/hooks/useRequestNotificationPermissionMutation'
import { NonDeniedOnly } from '@lib/ui/notifications/manage/NonDeniedOnly'
import { recordFromKeys } from '@lib/utils/record/recordFromKeys'
import styled from 'styled-components'

import { focusNotificationsConfig } from './config'
import { ManageFocusNotification } from './ManageFocusNotification'
import {
  focusNotifications,
  useFocusNotifications,
} from './state/focusNotifications'

const PrimarySwitch = styled(Switch)`
  padding: ${toSizeUnit(
    focusNotificationsConfig.horizontalPadding +
      focusNotificationsConfig.borderWidth,
  )};
`

export const FocusNotificationsToggles = () => {
  const [value, setValue] = useFocusNotifications()
  const { mutate: requestPermission } =
    useRequestNotificationPermissionMutation()

  return (
    <NonDeniedOnly name="focus">
      <VStack gap={8}>
        <PrimarySwitch
          onChange={(value) => {
            if (!value) {
              setValue(recordFromKeys(focusNotifications, () => value))
            } else {
              requestPermission(undefined, {
                onSuccess: () =>
                  setValue(recordFromKeys(focusNotifications, () => true)),
              })
            }
          }}
          value={Object.values(value).every((v) => v)}
          label="Enable all"
        />
        <VStack gap={12}>
          {focusNotifications.map((value) => (
            <ManageFocusNotification key={value} value={value} />
          ))}
        </VStack>
      </VStack>
    </NonDeniedOnly>
  )
}
