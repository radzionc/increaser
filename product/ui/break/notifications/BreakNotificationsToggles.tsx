import { VStack } from '@lib/ui/css/stack'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { Switch } from '@lib/ui/inputs/Switch'
import { useRequestNotificationPermissionMutation } from '@lib/ui/notifications/hooks/useRequestNotificationPermissionMutation'
import { NonDeniedOnly } from '@lib/ui/notifications/manage/NonDeniedOnly'
import { recordFromKeys } from '@lib/utils/record/recordFromKeys'
import styled from 'styled-components'

import { ManageBreakNotification } from './ManageBreakNotification'
import {
  breakNotifications,
  useBreakNotifications,
} from './state/breakNotifications'

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
