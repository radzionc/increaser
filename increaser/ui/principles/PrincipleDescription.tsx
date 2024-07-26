import { useCurrentPrinciple } from './CurrentPrincipleProvider'
import { Text } from '@lib/ui/text'

export const PrincipleDescription = () => {
  const { description } = useCurrentPrinciple()

  return (
    <Text size={14} color="supporting" style={{ whiteSpace: 'pre-line' }}>
      {description}
    </Text>
  )
}
