import { ReactNode } from 'react'

interface MemberOnlyActionProps {
  action: () => void
  render: (props: { action: () => void }) => ReactNode
}

export const MemberOnlyAction = ({ action, render }: MemberOnlyActionProps) => {
  return <>{render({ action })}</>
}
