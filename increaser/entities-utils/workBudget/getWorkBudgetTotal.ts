import { WorkBudget } from '@increaser/entities/WorkBudget'
import { weekendsNumber, workdaysNumber } from '@lib/utils/time/workweek'

export const getWorkBudgetTotal = (workBudget: WorkBudget): number =>
  workBudget.workdayHours * workdaysNumber +
  workBudget.weekendHours * weekendsNumber
