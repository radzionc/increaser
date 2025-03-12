import { EntityWithId } from '@lib/utils/entities/EntityWithId'
import { useUser } from '@product/ui/user/state/user'

export const ProjectEmoji = ({ id }: EntityWithId) => {
  const { projects } = useUser()

  return <>{projects[id].emoji}</>
}
