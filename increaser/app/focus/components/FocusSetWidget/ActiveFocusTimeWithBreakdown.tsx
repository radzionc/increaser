import { ActiveFocusTime } from './ActiveFocusTime'

import { HoverTracker } from '@lib/ui/base/HoverTracker'
import { FocusTimeBreakdown } from './breakdown/FocusTimeBreakdown'
import { PositionFocusTimeBreakdown } from './breakdown/PositionFocusTimeBreakdown'

export const ActiveFocusTimeWithBreakdown = () => {
  return (
    <HoverTracker
      render={({ props, clientPosition }) => (
        <>
          <ActiveFocusTime {...props} />
          {clientPosition && (
            <PositionFocusTimeBreakdown position={clientPosition}>
              <FocusTimeBreakdown />
            </PositionFocusTimeBreakdown>
          )}
        </>
      )}
    />
  )
}
