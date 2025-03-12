import { ValueProp } from '@lib/ui/props'
import { EmojiTextPrefix } from '@lib/ui/text/EmojiTextPrefix'
import { useUser } from '@product/ui/user/state/user'

export const TaskProject = ({ value }: ValueProp<string>) => {
  const { projects } = useUser()

  const { emoji } = projects[value]

  return <EmojiTextPrefix emoji={emoji} />
}
