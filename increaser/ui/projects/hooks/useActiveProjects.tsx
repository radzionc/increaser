import { useAssertUserState } from '../../user/UserStateContext'

export const useActiveProjects = () => {
  const { projects } = useAssertUserState()

  return projects.filter((project) => project.status === 'active')
}
