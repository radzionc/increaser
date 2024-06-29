import { EmojiTextPrefix } from '@lib/ui/text/EmojiTextPrefix'
import { ComponentWithValueProps } from '@lib/ui/props'
import { useAssertUserState } from '../user/UserStateContext'

export const TaskProject = ({ value }: ComponentWithValueProps<string>) => {
  const { projects } = useAssertUserState()

  const { emoji } = projects[value]

  return <EmojiTextPrefix emoji={emoji} />
}
