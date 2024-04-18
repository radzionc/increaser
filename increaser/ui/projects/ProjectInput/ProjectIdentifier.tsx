import { centerContent } from '@lib/ui/css/centerContent'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { IdentifierPlaceholder } from '@lib/ui/inputs/dropdown/FixedOptionsInput/IdentifierPlaceholder'
import { dropdownInputConfig } from '@lib/ui/inputs/dropdown/config'
import { getColor } from '@lib/ui/theme/getters'
import styled from 'styled-components'

export const ProjectIdentifier = styled(IdentifierPlaceholder)`
  ${sameDimensions(dropdownInputConfig.identifierSize)};
  ${centerContent};

  background: ${getColor('mist')};
  font-size: ${toSizeUnit(dropdownInputConfig.identifierSize * 0.6)};
  color: ${getColor('contrast')};
`
