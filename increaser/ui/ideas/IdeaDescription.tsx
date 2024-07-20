import { useCurrentIdea } from './CurrentIdeaProvider'
import { Text } from '@lib/ui/text'

export const IdeaDescription = () => {
  const { description } = useCurrentIdea()

  return (
    <Text size={14} color="supporting" style={{ whiteSpace: 'pre-line' }}>
      {description}
    </Text>
  )
}
