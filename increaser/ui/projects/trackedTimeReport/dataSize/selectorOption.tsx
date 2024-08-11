import { borderRadius } from '@lib/ui/css/borderRadius'
import { ComponentWithActiveState } from '@lib/ui/props'
import { matchColor } from '@lib/ui/theme/getters'
import { css } from 'styled-components'

export const selectorOption = css<ComponentWithActiveState>`
  ${borderRadius.s};
  border: 2px solid
    ${matchColor('isActive', { true: 'primary', false: 'mistExtra' })};
`
