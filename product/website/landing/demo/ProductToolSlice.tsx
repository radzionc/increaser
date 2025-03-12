import { Match } from '@lib/ui/base/Match'
import { ValueProp } from '@lib/ui/props'
import { ProductTool } from '@product/entities/ProductTool'

import { FocusSlice } from './FocusSlice'
import { GoalsSlice } from './GoalsSlice'
import { HabitsSlice } from './HabitsSlice'
import { PrinciplesSlice } from './PrinciplesSlice'
import { TasksSlice } from './TasksSlice'
import { TimeTrackingSlice } from './TimeTrackingSlice'
import { VisionSlice } from './VisionSlice'
import { WorkPreferencesSlice } from './WorkPreferencesSlice'

export const ProductToolSlice = ({ value }: ValueProp<ProductTool>) => (
  <Match
    value={value}
    tasks={() => <TasksSlice />}
    trackTime={() => <TimeTrackingSlice />}
    focus={() => <FocusSlice />}
    habits={() => <HabitsSlice />}
    vision={() => <VisionSlice />}
    goals={() => <GoalsSlice />}
    workPreferences={() => <WorkPreferencesSlice />}
    principles={() => <PrinciplesSlice />}
  />
)
