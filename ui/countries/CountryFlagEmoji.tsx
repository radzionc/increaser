import { CountryCode, countryNameRecord } from '@increaser/utils/countries'
import { getCountryFlagEmoji } from '@increaser/utils/countries/getCountryFlagEmoji'

interface CountryFlagEmojiProps {
  code?: CountryCode
}

export const CountryFlagEmoji = ({ code }: CountryFlagEmojiProps) => {
  const title = code ? countryNameRecord[code] || code : undefined
  return (
    <span role="img" aria-labelledby={title} title={title}>
      {code ? getCountryFlagEmoji(code) : '🏳'}
    </span>
  )
}
