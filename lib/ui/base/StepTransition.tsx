import { ReactNode } from 'react'
import { useBoolean } from '../hooks/useBoolean'
import { BackActionProp, ForwardActionProp } from '../props'

type StepTransitionProps = {
  from: (props: ForwardActionProp) => ReactNode
  to: (props: BackActionProp) => ReactNode
}

export const StepTransition = ({ from, to }: StepTransitionProps) => {
  const [value, { set: onForward, unset: onBack }] = useBoolean(false)

  return <>{value ? to({ onBack }) : from({ onForward })}</>
}
