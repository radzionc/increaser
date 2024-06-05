import { ProductTool } from '@increaser/entities/ProductTool'
import { Match } from '@lib/ui/base/Match'
import { ComponentWithValueProps } from '@lib/ui/props'
import { TasksSlice } from './TasksSlice'
import { TimeTrackingSlice } from './TimeTrackingSlice'
import { WorkBudgetSlice } from './WorkBudgetSlice'
import { ProjectsBudgetSlice } from './ProjectsBudgetSlice'
import { FocusSlice } from './FocusSlice'
import { HabitsSlice } from './HabitsSlice'
import { ScheduleSlice } from './ScheduleSlice'
import { WebsiteSlice } from '@lib/ui/website/WebsiteSlice'
import { VisionSlice } from './VisionSlice'

export const ProductToolSlice = ({
  value,
}: ComponentWithValueProps<ProductTool>) => (
  <WebsiteSlice id={value}>
    <Match
      value={value}
      tasks={() => <TasksSlice />}
      trackTime={() => <TimeTrackingSlice />}
      workBudget={() => <WorkBudgetSlice />}
      timePlanner={() => <ProjectsBudgetSlice />}
      focus={() => <FocusSlice />}
      habits={() => <HabitsSlice />}
      schedule={() => <ScheduleSlice />}
      vision={() => <VisionSlice />}
    />
  </WebsiteSlice>
)
