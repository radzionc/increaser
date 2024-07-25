import { useAssertUserState } from '../../../user/UserStateContext'

export const usePrincipleCategories = () => {
  const { principleCategories } = useAssertUserState()

  return Object.values(principleCategories)
}
