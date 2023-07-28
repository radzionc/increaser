import { ReactNode } from 'react'
import { useUserState } from 'user/state/UserStateContext'

interface ConditionalUserStateProps {
  present: () => ReactNode
  missing?: () => ReactNode
}

export const ConditionalUserState = ({
  present,
  missing,
}: ConditionalUserStateProps) => {
  const { state } = useUserState()

  return <>{state ? present() : missing?.()}</>
}
