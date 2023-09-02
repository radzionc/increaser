import { Text } from '@increaser/ui/ui/Text'
import { ScoreboardCountryFlag } from './ScoreboardCountryFlag'

interface ScoreboardDisplayNameProps {
  name?: string
  country?: string
}

export const ScoreboardDisplayName = ({
  name,
  country,
}: ScoreboardDisplayNameProps) => {
  return (
    <>
      <ScoreboardCountryFlag code={country} />
      <Text weight="semibold" color={name ? 'regular' : 'shy'}>
        {name || 'Anonymous'}
      </Text>
    </>
  )
}
