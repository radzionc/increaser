import { AppPagePlanView, appPageViews } from '@increaser/ui/navigation/app'

export const getCurrentPlanDayStep = (
  completion: Record<AppPagePlanView, boolean>,
): AppPagePlanView | null => {
  return appPageViews.plan.find((step) => !completion[step]) || null
}
