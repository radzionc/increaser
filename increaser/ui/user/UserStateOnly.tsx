import { ChildrenProp } from '@lib/ui/props'
import { useUserQuery } from '@increaser/ui/user/queries/useUserQuery'

export const UserStateOnly = ({ children }: ChildrenProp) => {
  const { data } = useUserQuery()

  return data ? <>{children}</> : null
}
