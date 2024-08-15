import { ReactNode } from 'react'
import { ComponentWithChildrenProps } from '../props'

type WrapProps = ComponentWithChildrenProps & {
  render: (children: ReactNode) => ReactNode
}

export const Wrap = ({ children, render }: WrapProps) => {
  return render(children)
}
