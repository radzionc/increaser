import { createContext } from 'react'
import { PlanDayStep } from '../PlanDayStep'
import { createContextHook } from '@lib/ui/state/createContextHook'

type PlanDayState = {
  currentStep: PlanDayStep
  setCurrentStep: (step: PlanDayStep | null) => void
  currentStepError?: string
}

export const PlanDayContext = createContext<PlanDayState | undefined>(undefined)

export const usePlanDay = createContextHook(PlanDayContext, 'PlanDayContext')
