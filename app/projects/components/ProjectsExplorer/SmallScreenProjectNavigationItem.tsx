import { useEffect, useRef } from 'react'
import styled, { css } from 'styled-components'
import { defaultTransitionCSS } from '@increaser/ui/ui/animations/transitions'
import { HSLA } from '@increaser/ui/ui/colors/HSLA'
import { centerContentCSS } from '@increaser/ui/ui/utils/centerContentCSS'
import { getSameDimensionsCSS } from '@increaser/ui/ui/utils/getSameDimensionsCSS'

import { useProjectExplorer } from './ProjectsExplorerProvider'
import Link from 'next/link'
import { getProjectPath } from 'router/Path'
import { EnhancedProject } from 'projects/Project'

export const Container = styled(Link)<{
  selected: boolean
  $color: HSLA
}>`
  ${getSameDimensionsCSS(48)};
  font-size: 24px;
  border-radius: 8px;
  ${centerContentCSS}

  ${defaultTransitionCSS}

  border: 2px solid ${({ theme }) => theme.colors.mist.toCssValue()};
  ${defaultTransitionCSS}
  ${({ selected, theme, $color }) =>
    selected &&
    css`
      background-color: ${theme.colors.mist.toCssValue()};
      border-color: ${$color.toCssValue()};
    `}
`

export const SmallScreenProjectNavigationItem = ({
  emoji,
  id,
  hslaColor,
}: EnhancedProject) => {
  const ref = useRef<HTMLAnchorElement>(null)
  const { currentProject } = useProjectExplorer()
  const isSelected = id === currentProject?.id

  useEffect(() => {
    if (isSelected) {
      ref.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      })
    }
  }, [isSelected])

  return (
    <Container
      ref={ref}
      href={getProjectPath(id)}
      $color={hslaColor}
      selected={isSelected}
    >
      {emoji}
    </Container>
  )
}
