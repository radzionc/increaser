import { useMemo } from 'react'
import { useUser } from '@increaser/ui/user/state/user'
import { order } from '@lib/utils/array/order'

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
