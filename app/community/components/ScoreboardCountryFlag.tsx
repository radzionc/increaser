import { CountryCode } from '@increaser/utils/countries'
import { CountryFlag } from '@increaser/ui/countries/flags/CountryFlag'
import { CountryFlagFrame } from '@increaser/ui/countries/CountryFlagFrame'
import styled from 'styled-components'
import { IconWrapper } from '@increaser/ui/icons/IconWrapper'

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
