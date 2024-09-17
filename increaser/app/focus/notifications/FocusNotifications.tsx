import {
  FocusNotification,
  focusNotifications,
  useFocusNotifications,
} from './state/focusNotifications'

import { SessionEndNotification } from './SessionEndNotification'
import { WorkDayEndNotification } from './WorkDayEndNotification'
import { EyeBreakNotification } from './EyeBreakNotification'
import { NotPausedFocusOnly } from '../components/NotPausedFocusOnly'

const notificationComponent: Record<FocusNotification, React.FC> = {
  sessionEnd: SessionEndNotification,
  workDayEnd: WorkDayEndNotification,
  eyeBreak: EyeBreakNotification,
}

export const FocusNotifications = () => {
  const [value] = useFocusNotifications()

  return (
    <NotPausedFocusOnly>
      {focusNotifications.map((notification) => {
        if (!value[notification]) return null

        const Component = notificationComponent[notification]

        return <Component key={notification} />
      })}
    </NotPausedFocusOnly>
  )
}
