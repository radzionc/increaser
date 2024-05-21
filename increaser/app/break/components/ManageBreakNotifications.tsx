import { BreakBrowserNotification } from './BreakBrowserNotifications'
import { BreakSoundNotification } from './BreakSoundNotifications'

export const ManageBreakNotifications = () => {
  return (
    <>
      <BreakBrowserNotification />
      <BreakSoundNotification />
    </>
  )
}
