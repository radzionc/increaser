import { useUser } from '@product/ui/user/state/user'

export const useProject = (id: string | null) => {
  const { projects } = useUser()

  return id ? projects[id] || null : null
}
