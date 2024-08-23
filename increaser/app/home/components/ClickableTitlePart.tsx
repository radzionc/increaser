import { interactive } from '@lib/ui/css/interactive'
import { transition } from '@lib/ui/css/transition'
import { CollapsableStateIndicator } from '@lib/ui/layout/CollapsableStateIndicator'
import { ComponentWithActiveState } from '@lib/ui/props'
import { Text } from '@lib/ui/text'
import { getColor } from '@lib/ui/theme/getters'
import { ComponentProps, forwardRef } from 'react'
import styled, { css } from 'styled-components'

const ToggleIconContainer = styled(CollapsableStateIndicator)`
  ${transition};
  color: ${getColor('textShy')};
  vertical-align: middle;
  font-size: 18px;
  margin-left: 4px;
`

const activeContainer = css`
  ${ToggleIconContainer} {
    color: ${getColor('primary')};
  }
`

const Container = styled(Text)<ComponentWithActiveState>`
  ${interactive};
  ${transition};
  &:hover {
    ${activeContainer};
  }

  ${({ isActive }) =>
    isActive &&
    css`
      ${activeContainer};
      color: ${getColor('primary')};
    `}
`

export const ClickableTitlePart = forwardRef<
  HTMLElement,
  ComponentProps<typeof Container>
>(({ children, ...rest }, ref) => {
  return (
    <Container as="span" {...rest} ref={ref}>
      {children}
      <ToggleIconContainer isOpen={rest.isActive} />
    </Container>
  )
})
