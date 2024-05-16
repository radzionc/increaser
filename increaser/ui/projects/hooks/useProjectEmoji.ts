import { useAssertUserState } from '../../user/UserStateContext'
import { getProjectEmoji } from '../utils/getProjectEmoji'

export const useProjectEmoji = (id?: string | null) => {
  const { projects } = useAssertUserState()
  return getProjectEmoji({ projects, id })
}
