import { useFocusNotifications } from './state/focusNotifications'

import { SessionEndNotification } from './SessionEndNotification'
import { WorkDayEndNotification } from './WorkDayEndNotification'
import { EyeBreakNotification } from './EyeBreakNotification'
import { Match } from '@lib/ui/base/Match'
import { toEntries } from '@lib/utils/record/toEntries'
import { useMemo } from 'react'

export const FocusNotifications = () => {
  const [value] = useFocusNotifications()

  const notifications = useMemo(
    () =>
      toEntries(value)
        .filter(({ value }) => value)
        .map(({ key }) => key),
    [value],
  )

  return (
    <>
      {notifications.map((notification) => (
        <Match
          key={notification}
          value={notification}
          sessionEnd={() => <SessionEndNotification />}
          workDayEnd={() => <WorkDayEndNotification />}
          eyeBreak={() => <EyeBreakNotification />}
        />
      ))}
    </>
  )
}
