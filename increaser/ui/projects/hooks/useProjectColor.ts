import { useTheme } from 'styled-components'
import { useAssertUserState } from '../../user/UserStateContext'
import { getProjectColor } from '../utils/getProjectColor'

export const useProjectColor = (id?: string) => {
  const { projects } = useAssertUserState()
  const { colors } = useTheme()
  return getProjectColor({ projects, colors, id })
}
