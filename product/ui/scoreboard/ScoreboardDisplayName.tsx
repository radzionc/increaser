import { CountryCode } from '@lib/countries'
import { Text } from '@lib/ui/text'

import { ScoreboardCountryFlag } from './ScoreboardCountryFlag'

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
