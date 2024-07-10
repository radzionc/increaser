import { usePlanDay } from './state/PlanDayContext'
import { Match } from '@lib/ui/base/Match'
import { GoalsReview } from './goals/GoalsReview'
import { Tasks } from '@increaser/ui/tasks/Tasks'
import { MyHabits } from '../../habits/components/MyHabits'

export const PlanDayStepContent = () => {
  const { currentStep } = usePlanDay()

  if (currentStep === null) {
    return 'coming soon'
  }

  return (
    <Match
      value={currentStep}
      habits={() => <MyHabits />}
      goals={() => <GoalsReview />}
      tasks={() => <Tasks />}
    />
  )
}
