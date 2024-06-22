import { ComponentWithChildrenProps } from '@lib/ui/props'
import { PlanDayStep } from './PlanDayStep'
import { useEffect, useMemo, useState } from 'react'
import { usePlanDayCompletion } from './hooks/usePlanDayCompletion'
import { PlanDayContext } from './state/PlanDayContext'
import { useHasOverdueTasks } from '@increaser/ui/tasks/hooks/useHasOverdueTasks'
import { getCurrentPlanDayStep } from './utils/getCurrentPlanDayStep'
import { useRouter } from 'next/router'
import { getAppPath } from '@increaser/ui/navigation/app'

export const PlanDayProvider = ({ children }: ComponentWithChildrenProps) => {
  const completion = usePlanDayCompletion()
  const [currentStep, setCurrentStep] = useState<PlanDayStep | null>(() =>
    getCurrentPlanDayStep(completion),
  )

  const hasOverdueTasks = useHasOverdueTasks()

  const { push } = useRouter()

  const currentStepError = useMemo(() => {
    if (currentStep === 'tasks' && hasOverdueTasks) {
      return 'Clear overdue tasks before you can proceed'
    }
  }, [currentStep, hasOverdueTasks])

  useEffect(() => {
    if (currentStep === null) {
      push(getAppPath('focus'))
    }
  }, [currentStep, push])

  if (currentStep === null) {
    return null
  }

  return (
    <PlanDayContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        currentStepError,
      }}
    >
      {children}
    </PlanDayContext.Provider>
  )
}
