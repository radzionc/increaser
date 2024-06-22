import { usePlanDay } from './state/PlanDayContext'
import { planDayStepTarget } from './PlanDayStep'
import { PageTitle } from '../../ui/PageTitle'

export const PlanDayStepTitle = () => {
  const { currentStep } = usePlanDay()

  const title =
    currentStep === null
      ? `Let's make it a great day`
      : planDayStepTarget[currentStep]

  return <PageTitle documentTitle={`☕️ ${title}`} title={title} />
}
