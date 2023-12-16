import { useSetsExplorer } from './SetsExplorerProvider'
import { hourHeight } from './config'
import { DayTimeLabels } from '../DayTimeLabels'

export const SetsExplorerTimeMarks = () => {
  const { startHour, endHour } = useSetsExplorer()
  return (
    <div style={{ height: (endHour - startHour) * hourHeight }}>
      <DayTimeLabels startHour={startHour} endHour={endHour} />
    </div>
  )
}
