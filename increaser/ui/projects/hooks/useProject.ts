import { useAssertUserState } from '../../user/UserStateContext'

export const useProject = (id: string | null) => {
  const { projects } = useAssertUserState()

  return id ? projects[id] || null : null
}
