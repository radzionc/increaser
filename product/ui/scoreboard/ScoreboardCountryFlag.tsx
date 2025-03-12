import { CountryCode } from '@lib/countries'
import { CountryFlagFrame } from '@lib/countries-ui/CountryFlagFrame'
import { CountryFlag } from '@lib/countries-ui/flags/CountryFlag'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import styled from 'styled-components'

interface ScoreboardCountryFlagProps {
  code?: CountryCode
}

const Container = styled(IconWrapper)`
  font-size: 20px;
  border-radius: 2px;
`

export const ScoreboardCountryFlag = ({ code }: ScoreboardCountryFlagProps) => {
  return (
    <Container>
      {code ? <CountryFlag code={code} /> : <CountryFlagFrame />}
    </Container>
  )
}
