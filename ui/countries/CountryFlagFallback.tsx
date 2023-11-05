import { CountryCode } from '@increaser/utils/countries'
import styled from 'styled-components'
import { CountryFlagFrame } from './CountryFlagFrame'
import { getColor } from '../ui/theme/getters'
import { SvgIconProps } from '../icons/SvgIconProps'

export interface CountryFlagFallbackProps extends SvgIconProps {
  code: CountryCode
}

const Container = styled(CountryFlagFrame)`
  text {
    fill: ${getColor('textSupporting')};
    font-size: 0.4em;
  }
`

export const CountryFlagFallback = ({
  code,
  ...props
}: CountryFlagFallbackProps) => (
  <Container {...props}>
    <text x="50%" y="55%" textAnchor="middle" dominantBaseline="middle">
      {code}
    </text>
  </Container>
)
