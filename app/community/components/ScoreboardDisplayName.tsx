import { Text } from '@increaser/ui/ui/Text'
import { getCountryFlagEmoji } from '@increaser/utils/getCountryFlagEmoji'

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
      <Text color={country ? 'contrast' : 'shy'}>
        {country ? getCountryFlagEmoji(country) : '🏳️'}
      </Text>
      <Text weight="semibold" color={name ? 'regular' : 'shy'}>
        {name || 'Anonymous'}
      </Text>
    </>
  )
}
