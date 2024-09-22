import {
  FocusNotification,
  focusNotifications,
  useFocusNotifications,
} from './state/focusNotifications'

import { SessionEndNotification } from './SessionEndNotification'
import { WorkDayEndNotification } from './WorkDayEndNotification'
import { EyeBreakNotification } from './EyeBreakNotification'

const notificationComponent: Record<FocusNotification, React.FC> = {
  sessionEnd: SessionEndNotification,
  workDayEnd: WorkDayEndNotification,
  eyeBreak: EyeBreakNotification,
}

export const FocusNotifications = () => {
  const [value] = useFocusNotifications()

  return (
    <>
      {focusNotifications.map((notification) => {
        if (!value[notification]) return null

        const Component = notificationComponent[notification]

        return <Component key={notification} />
      })}
    </>
  )
}
