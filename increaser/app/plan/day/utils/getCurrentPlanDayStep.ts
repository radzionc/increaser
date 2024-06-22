import { PlanDayStep, planDaySteps } from '../PlanDayStep'

export const getCurrentPlanDayStep = (
  completion: Record<PlanDayStep, boolean>,
): PlanDayStep | null => {
  return planDaySteps.find((step) => !completion[step]) || null
}
