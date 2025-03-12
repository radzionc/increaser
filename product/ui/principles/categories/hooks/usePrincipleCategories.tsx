import { useUser } from '@product/ui/user/state/user'
import { useMemo } from 'react'

export const usePrincipleCategories = () => {
  const { principleCategories } = useUser()

  return useMemo(
    () =>
      Object.values(principleCategories).sort((a, b) =>
        a.name.localeCompare(b.name),
      ),
    [principleCategories],
  )
}
