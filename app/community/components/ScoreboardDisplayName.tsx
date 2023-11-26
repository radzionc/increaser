import { Text } from '@increaser/ui/text'
import { ScoreboardCountryFlag } from './ScoreboardCountryFlag'
import { CountryCode } from '@increaser/utils/countries'

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
      <Text cropped weight="semibold" color={name ? 'regular' : 'shy'}>
        {name || 'Anonymous'}
      </Text>
    </>
  )
}
