import { Switch } from '@lib/ui/inputs/Switch'
import {
  breakNotifications,
  useBreakNotifications,
} from './state/breakNotifications'
import { useRequestNotificationPermissionMutation } from '@lib/ui/notifications/hooks/useRequestNotificationPermissionMutation'
import { VStack } from '@lib/ui/css/stack'
import styled from 'styled-components'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { recordFromKeys } from '@lib/utils/record/recordFromKeys'
import { ManageBreakNotification } from './ManageBreakNotification'
import { NonDeniedOnly } from '@lib/ui/notifications/manage/NonDeniedOnly'

const breakNotificationsConfig = {
  horizontalPadding: 8,
  borderWidth: 1,
}

const PrimarySwitch = styled(Switch)`
  padding: ${toSizeUnit(
    breakNotificationsConfig.horizontalPadding +
      breakNotificationsConfig.borderWidth,
  )};
`

export const BreakNotificationsToggles = () => {
  const [value, setValue] = useBreakNotifications()
  const { mutate: requestPermission } =
    useRequestNotificationPermissionMutation()

  return (
    <NonDeniedOnly name="break">
      <VStack gap={8}>
        <PrimarySwitch
          onChange={(value) => {
            if (!value) {
              setValue(recordFromKeys(breakNotifications, () => value))
            } else {
              requestPermission(undefined, {
                onSuccess: () =>
                  setValue(recordFromKeys(breakNotifications, () => true)),
              })
            }
          }}
          value={Object.values(value).every((v) => v)}
          label="Enable all"
        />
        <VStack gap={12}>
          {breakNotifications.map((value) => (
            <ManageBreakNotification key={value} value={value} />
          ))}
        </VStack>
      </VStack>
    </NonDeniedOnly>
  )
}
