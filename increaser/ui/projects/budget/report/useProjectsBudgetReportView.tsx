import { pluralize } from '@lib/utils/pluralize'
import {
  PersistentStateKey,
  usePersistentState,
} from '../../../state/persistentState'
import { previousWeeksConfig } from '../PreviousWeeks/previousWeeksConfig'

export const projectsBudgetReportViews = ['thisWeek', 'previousWeeks'] as const
type ProjectsBudgetReportView = (typeof projectsBudgetReportViews)[number]

export const projectsBudgetReportViewName: Record<
  ProjectsBudgetReportView,
  string
> = {
  thisWeek: 'This week',
  previousWeeks: `Previous ${pluralize(previousWeeksConfig.weeks, 'week')}`,
}

export const useProjectsBudgetReportView = () => {
  return usePersistentState<ProjectsBudgetReportView>(
    PersistentStateKey.ProjectsBudgetReportView,
    'thisWeek',
  )
}
