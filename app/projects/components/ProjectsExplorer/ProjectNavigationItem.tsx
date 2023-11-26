import { useRef } from 'react'
import styled, { css } from 'styled-components'
import { transition } from '@increaser/ui/css/transition'
import { ChevronRightIcon } from '@increaser/ui/icons/ChevronRightIcon'
import { Panel } from '@increaser/ui/panel/Panel'
import { HStack, VStack } from '@increaser/ui/layout/Stack'
import { Text } from '@increaser/ui/text'
import { getColor } from '@increaser/ui/theme/getters'
import { centerContent } from '@increaser/ui/css/centerContent'
import { sameDimensions } from '@increaser/ui/css/sameDimensions'
import { S_IN_HOUR } from '@increaser/utils/time'

import { useProjectExplorer } from './ProjectsExplorerProvider'
import Link from 'next/link'
import { getProjectPath } from 'router/Path'
import { EnhancedProject } from 'projects/Project'

export const IconWr = styled.div<{ selected: boolean }>`
  display: flex;
  font-size: 24px;
  color: ${({ theme }) => theme.colors.textSupporting.toCssValue()};
  ${transition};

  ${sameDimensions(40)};
  ${centerContent};
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
