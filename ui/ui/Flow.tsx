import { ReactNode } from 'react'

export interface FlowStep<K> {
  id: K
}

type StepHandlers<K extends string, T extends FlowStep<K>> = {
  [key in T['id']]: (step: Extract<T, { id: key }>) => ReactNode
}

type FlowProps<K extends string, T extends FlowStep<K>> = StepHandlers<K, T> & {
  step: T
}
export function Flow<K extends string, T extends FlowStep<K>>({
  step,
  ...steps
}: FlowProps<K, T>) {
  const id = step.id as keyof typeof steps
  const render = steps[id]

  return <>{render(step as Extract<T, { id: string }>)}</>
}
