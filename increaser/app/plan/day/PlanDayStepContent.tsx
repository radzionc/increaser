import { usePlanDay } from './state/PlanDayContext'
import { Match } from '@lib/ui/base/Match'
import { HabitsReview } from './habits/HabitsReview'
import { GoalsReview } from './goals/GoalsReview'
import { TodayTasksReview } from './tasks/TodayTasksReview'

export const PlanDayStepContent = () => {
  const { currentStep } = usePlanDay()

  if (currentStep === null) {
    return 'coming soon'
  }

  return (
    <Match
      value={currentStep}
      habits={() => <HabitsReview />}
      goals={() => <GoalsReview />}
      tasks={() => <TodayTasksReview />}
    />
  )
}
