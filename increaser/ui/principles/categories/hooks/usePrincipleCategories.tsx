import { useMemo } from 'react'
import { useUser } from '@increaser/ui/user/state/user'

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
