import { EntityWithId } from '@lib/utils/entities/EntityWithId'
import { useAssertUserState } from '../user/UserStateContext'

export const ProjectEmoji = ({ id }: EntityWithId) => {
  const { projects } = useAssertUserState()

  return <>{projects[id].emoji}</>
}
