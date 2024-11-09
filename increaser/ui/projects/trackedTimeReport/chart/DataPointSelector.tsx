import { HoverTracker } from '@lib/ui/base/HoverTracker'
import { getSegmentIndex } from '@lib/utils/math/getSegmentIndex'
import { TakeWholeSpaceAbsolutely } from '@lib/ui/css/takeWholeSpaceAbsolutely'
import { DataPointInfo } from './DataPointInfo'
import { useActiveItemIndex } from '@lib/ui/list/ActiveItemIndexProvider'
import { useSelectedIntervalActiveTimeSeries } from './useSelectedIntervalActiveTimeSeries'
import { BodyPortal } from '@lib/ui/dom/BodyPortal'

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
