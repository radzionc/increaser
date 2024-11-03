import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { panelDefaultPadding } from '@lib/ui/css/panel'
import { verticalPadding } from '@lib/ui/css/verticalPadding'
import { FieldArrayContainer } from '@lib/ui/form/components/FieldArrayContainer'
import styled from 'styled-components'

export const LinkedEntitiesContainer = styled(FieldArrayContainer)`
  ${horizontalPadding(panelDefaultPadding)};
  ${verticalPadding(panelDefaultPadding / 2)};
  gap: 4px;
`
