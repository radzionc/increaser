import styled, { useTheme } from 'styled-components'
import { Circle } from '@lib/ui/layout/Circle'
import { HStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'

import {
  IconWr,
  Container as NavigationItemContainer,
} from './ProjectNavigationItem'
import { useProjectExplorer } from './ProjectsExplorerProvider'

import { ChevronRightIcon } from '@lib/ui/icons/ChevronRightIcon'
import Link from 'next/link'
import { AppPath } from '@increaser/ui/navigation/AppPath'

const Container = styled(NavigationItemContainer)`
  border: 2px dashed ${({ theme }) => theme.colors.mistExtra.toCssValue()};
`

export const CreateProjectNavigationItem = () => {
  const { currentProject } = useProjectExplorer()

  const { colors } = useTheme()

  const isSelected = currentProject === null

  return (
    <Link href={AppPath.CreateProject}>
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
