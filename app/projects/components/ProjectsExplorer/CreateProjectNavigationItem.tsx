import styled, { useTheme } from 'styled-components'
import { Circle } from '@increaser/ui/ui/Circle'
import { HStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'

import {
  IconWr,
  Container as NavigationItemContainer,
} from './ProjectNavigationItem'
import { useProjectExplorer } from './ProjectsExplorerProvider'

import { ChevronRightIcon } from '@increaser/ui/ui/icons/ChevronRightIcon'
import Link from 'next/link'
import { Path } from 'router/Path'

const Container = styled(NavigationItemContainer)`
  border: 2px dashed ${({ theme }) => theme.colors.mistExtra.toCssValue()};
`

export const CreateProjectNavigationItem = () => {
  const { currentProject } = useProjectExplorer()

  const { colors } = useTheme()

  const isSelected = currentProject === null

  return (
    <Link href={Path.CreateProject}>
      <Container selected={isSelected}>
        <HStack alignItems="center" justifyContent="space-between">
          <HStack
            fullWidth
            style={{ overflow: 'hidden' }}
            alignItems="center"
            gap={12}
          >
            <Circle size={40} background={colors.mist} />
            <Text cropped weight="semibold">
              New project
            </Text>
          </HStack>
          <IconWr selected={isSelected}>
            <ChevronRightIcon />
          </IconWr>
        </HStack>
      </Container>
    </Link>
  )
}
