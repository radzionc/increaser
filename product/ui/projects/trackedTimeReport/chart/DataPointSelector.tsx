import { HoverTracker } from '@lib/ui/base/HoverTracker'
import { TakeWholeSpaceAbsolutely } from '@lib/ui/css/takeWholeSpaceAbsolutely'
import { BodyPortal } from '@lib/ui/dom/BodyPortal'
import { useActiveItemIndex } from '@lib/ui/list/ActiveItemIndexProvider'
import { getSegmentIndex } from '@lib/utils/math/getSegmentIndex'

import { DataPointInfo } from './DataPointInfo'
import { useSelectedIntervalActiveTimeSeries } from './useSelectedIntervalActiveTimeSeries'

export const DataPointSelector = () => {
  const data = useSelectedIntervalActiveTimeSeries()

  const [activeIndex, setActiveIndex] = useActiveItemIndex()

  return (
    <HoverTracker
      onChange={({ position }) => {
        if (position) {
          setActiveIndex(getSegmentIndex(data.length, position.x))
        } else {
          setActiveIndex(null)
        }
      }}
      render={({ props, clientPosition }) => (
        <>
          <TakeWholeSpaceAbsolutely {...props}>
            <BodyPortal>
              {clientPosition && activeIndex !== null && (
                <DataPointInfo position={clientPosition} />
              )}
            </BodyPortal>
          </TakeWholeSpaceAbsolutely>
        </>
      )}
    />
  )
}
