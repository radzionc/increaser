import { EmojiTextPrefix } from '@lib/ui/text/EmojiTextPrefix'
import { ValueProp } from '@lib/ui/props'
import { useUser } from '@increaser/ui/user/state/user'

export const TaskProject = ({ value }: ValueProp<string>) => {
  const { projects } = useUser()

  const { emoji } = projects[value]

  return <EmojiTextPrefix emoji={emoji} />
}
