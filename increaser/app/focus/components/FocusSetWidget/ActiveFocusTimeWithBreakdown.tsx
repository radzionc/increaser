import { ActiveFocusTime } from './ActiveFocusTime'

import { HoverTracker } from '@lib/ui/base/HoverTracker'
import { FocusTimeBreakdown } from './FocusTimeBreakdown'

export const ActiveFocusTimeWithBreakdown = () => {
  return (
    <HoverTracker
      render={({ props, clientPosition }) => (
        <>
          <ActiveFocusTime {...props} />
          {clientPosition && <FocusTimeBreakdown position={clientPosition} />}
        </>
      )}
    />
  )
}
