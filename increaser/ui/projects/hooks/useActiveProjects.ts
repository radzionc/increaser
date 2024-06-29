import { useMemo } from 'react'
import { useAssertUserState } from '../../user/UserStateContext'
import { order } from '@lib/utils/array/order'

export const useActiveProjects = () => {
  const { projects } = useAssertUserState()

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
