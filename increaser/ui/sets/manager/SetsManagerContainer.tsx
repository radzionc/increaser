import { panel } from '@lib/ui/panel/Panel'
import styled from 'styled-components'
import { dayOverviewConfig } from './overview/config'

export const SetsManagerContainer = styled.div`
  ${panel({
    withSections: true,
    kind: 'secondary',
    padding: dayOverviewConfig.horizontalPadding,
  })};
  height: 100%;
`
