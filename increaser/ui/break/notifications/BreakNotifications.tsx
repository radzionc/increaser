import { useBreakNotifications } from './state/breakNotifications'
import { Match } from '@lib/ui/base/Match'
import { toEntries } from '@lib/utils/record/toEntries'
import { useMemo } from 'react'
import { BreakEndNotification } from './BreakEndNotification'
import { BreakExpiredNotification } from './BreakExpiredNotification'

export const BreakNotifications = () => {
  const [value] = useBreakNotifications()

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
          breakEnd={() => <BreakEndNotification />}
          breakExpired={() => <BreakExpiredNotification />}
        />
      ))}
    </>
  )
}
