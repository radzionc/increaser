import { Text } from '@increaser/ui/ui/Text'
import { ScoreboardCountryFlag } from './ScoreboardCountryFlag'
import { CountryCode } from '@increaser/utils/countryNameRecord'

interface ScoreboardDisplayNameProps {
  name?: string
  country?: CountryCode
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
