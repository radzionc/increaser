import { useEffect, useRef } from 'react'
import styled, { css } from 'styled-components'
import { transition } from '@increaser/ui/css/transition'
import { HSLA } from '@increaser/ui/colors/HSLA'
import { centerContent } from '@increaser/ui/css/centerContent'
import { sameDimensions } from '@increaser/ui/css/sameDimensions'

import { useProjectExplorer } from './ProjectsExplorerProvider'
import { getProjectPath } from 'router/Path'
import { EnhancedProject } from 'projects/Project'
import Link from 'next/link'

export const Container = styled.div<{
  selected: boolean
  $color: HSLA
}>`
  ${sameDimensions(48)};
  font-size: 24px;
  border-radius: 8px;
  ${centerContent}

  ${transition}

  border: 2px solid ${({ theme }) => theme.colors.mist.toCssValue()};
  ${transition}
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
  const ref = useRef<HTMLDivElement>(null)
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
    <Link href={getProjectPath(id)}>
      <Container ref={ref} $color={hslaColor} selected={isSelected}>
        {emoji}
      </Container>
    </Link>
  )
}
