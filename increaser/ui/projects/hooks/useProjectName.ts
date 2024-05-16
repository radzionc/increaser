import { useAssertUserState } from '../../user/UserStateContext'
import { getProjectName } from '../utils/getProjectName'

export const useProjectName = (id?: string) => {
  const { projects } = useAssertUserState()
  return getProjectName({ projects, id })
}
