import { useMemo } from 'react'
import { useAssertUserState } from '../../../user/UserStateContext'

export const usePrincipleCategories = () => {
  const { principleCategories } = useAssertUserState()

  return useMemo(
    () =>
      Object.values(principleCategories).sort((a, b) =>
        a.name.localeCompare(b.name),
      ),
    [principleCategories],
  )
}
