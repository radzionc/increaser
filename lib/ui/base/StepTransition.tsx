import { ReactNode } from 'react'
import {
  ComponentWithBackActionProps,
  ComponentWithForwardActionProps,
} from '../props'
import { useBoolean } from '../hooks/useBoolean'

type StepTransitionProps = {
  from: (props: ComponentWithForwardActionProps) => ReactNode
  to: (props: ComponentWithBackActionProps) => ReactNode
}

export const StepTransition = ({ from, to }: StepTransitionProps) => {
  const [value, { set: onForward, unset: onBack }] = useBoolean(false)

  return <>{value ? from({ onForward }) : to({ onBack })}</>
}
