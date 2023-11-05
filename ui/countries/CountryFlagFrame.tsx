import styled from 'styled-components'
import { flagAspectRatio } from './config'
import { getColor } from '../ui/theme/getters'
import { fitInOneEm } from '../css/fitInOneEm'

export const CountryFlagFrame = styled.svg`
  ${fitInOneEm(flagAspectRatio)};
  background: ${getColor('mist')};
`
