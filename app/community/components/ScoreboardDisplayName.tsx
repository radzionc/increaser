import { Text } from '@increaser/ui/ui/Text'
import { CountryFlag } from '@increaser/ui/ui/CountryFlag'
import styled from 'styled-components'

interface ScoreboardDisplayNameProps {
  name?: string
  country?: string
}

const Flag = styled(CountryFlag)`
  border-radius: 2px;
  width: 20px;
`

export const ScoreboardDisplayName = ({
  name,
  country,
}: ScoreboardDisplayNameProps) => {
  return (
    <>
      <Flag code={country} />
      <Text weight="semibold" color={name ? 'regular' : 'shy'}>
        {name || 'Anonymous'}
      </Text>
    </>
  )
}
