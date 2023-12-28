import { CountryCode } from '@lib/countries'
import { CountryFlag } from '@lib/ui/countries/flags/CountryFlag'
import { CountryFlagFrame } from '@lib/ui/countries/CountryFlagFrame'
import styled from 'styled-components'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'

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
