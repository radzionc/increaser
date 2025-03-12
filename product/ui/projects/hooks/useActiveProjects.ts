import { order } from '@lib/utils/array/order'
import { useUser } from '@product/ui/user/state/user'
import { useMemo } from 'react'

export const useActiveProjects = () => {
  const { projects } = useUser()

  return useMemo(
    () =>
      order(
        Object.values(projects).filter(
          (project) => project.status === 'active',
        ),
        ({ order }) => order,
        'asc',
      ),
    [projects],
  )
}
