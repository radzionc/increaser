import { useRef } from 'react'
import styled, { css } from 'styled-components'
import { defaultTransitionCSS } from '@increaser/ui/ui/animations/transitions'
import { ChevronRightIcon } from '@increaser/ui/ui/icons/ChevronRightIcon'
import { Panel } from '@increaser/ui/ui/Panel/Panel'
import { HStack, VStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'
import { getColor } from '@increaser/ui/ui/theme/getters'
import { centerContentCSS } from '@increaser/ui/ui/utils/centerContentCSS'
import { getSameDimensionsCSS } from '@increaser/ui/ui/utils/getSameDimensionsCSS'
import { S_IN_HOUR } from '@increaser/utils/time'

import { useProjectExplorer } from './ProjectsExplorerProvider'
import Link from 'next/link'
import { getProjectPath } from 'router/Path'
import { EnhancedProject } from 'projects/Project'

export const IconWr = styled.div<{ selected: boolean }>`
  display: flex;
  font-size: 24px;
  color: ${({ theme }) => theme.colors.textSupporting.toCssValue()};
  ${defaultTransitionCSS};

  ${getSameDimensionsCSS(40)};
  ${centerContentCSS};
  border-radius: 1000px;

  ${({ selected }) =>
    selected &&
    css`
      background: ${getColor('mist')};
      color: ${getColor('contrast')};
    `}
`

export const Container = styled(Panel)<{
  selected: boolean
}>`
  border: 2px solid transparent;

  ${({ selected }) =>
    !selected &&
    css`
      box-shadow: none;
      background: transparent;
    `}

  :hover ${IconWr} {
    background: ${getColor('mist')};
    color: ${getColor('contrast')};
  }
`

export const ProjectNavigationItem = (project: EnhancedProject) => {
  const { currentProject } = useProjectExplorer()

  const ref = useRef<HTMLAnchorElement>(null)

  const { emoji, name, total } = project

  const isSelected = project.id === currentProject?.id

  return (
    <Link href={getProjectPath(project.id)} ref={ref}>
      <Container id={project.id} selected={isSelected}>
        <HStack alignItems="center" justifyContent="space-between" gap={20}>
          <HStack
            fullWidth
            style={{ overflow: 'hidden' }}
            alignItems="center"
            gap={12}
          >
            <Text color="contrast" height="small" size={40}>
              {emoji}
            </Text>
            <VStack
              style={{ overflow: 'hidden', flex: 1 }}
              fullWidth
              alignItems="start"
              gap={2}
            >
              <Text cropped weight="semibold">
                {name}
              </Text>
              <HStack alignItems="center" gap={8}>
                <Text weight="semibold" size={14} color="supporting">
                  {Math.round(total / S_IN_HOUR)} hours
                </Text>
              </HStack>
            </VStack>
          </HStack>
          <IconWr selected={isSelected}>
            <ChevronRightIcon />
          </IconWr>
        </HStack>
      </Container>
    </Link>
  )
}
