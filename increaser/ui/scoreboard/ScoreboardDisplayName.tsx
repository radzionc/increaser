import { Text } from '@lib/ui/text'
import { ScoreboardCountryFlag } from './ScoreboardCountryFlag'
import { CountryCode } from '@lib/countries'

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
      <Text cropped weight="500" color={name ? 'regular' : 'shy'}>
        {name || 'Anonymous'}
      </Text>
    </>
  )
}
