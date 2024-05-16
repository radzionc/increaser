import { findBy } from '@lib/utils/array/findBy'
import { useAssertUserState } from '../../user/UserStateContext'

export const useProject = (id?: string | null) => {
  const { projects } = useAssertUserState()

  return findBy(projects, 'id', id)
}
