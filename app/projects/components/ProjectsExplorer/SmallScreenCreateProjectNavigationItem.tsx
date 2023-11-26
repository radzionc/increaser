import styled, { useTheme } from 'styled-components'
import { PlusIcon } from '@increaser/ui/icons/PlusIcon'
import { HStack } from '@increaser/ui/layout/Stack'
import { Text } from '@increaser/ui/text'

import { useProjectExplorer } from './ProjectsExplorerProvider'
import { Container as NavigationItemContainer } from './SmallScreenProjectNavigationItem'
import { Path } from 'router/Path'
import Link from 'next/link'

const Container = styled(NavigationItemContainer)`
  min-width: 86px;
  font-size: 14px;
  font-weight: 500;
`

export const SmallScreenCreateProjectNavigationItem = () => {
  const { currentProject } = useProjectExplorer()

  const { colors } = useTheme()

  const isSelected = currentProject === null

  return (
    <Link href={Path.CreateProject}>
      <Container $color={colors.text} selected={isSelected}>
        <HStack gap={4} alignItems="center">
          <PlusIcon />
          <Text>Project</Text>
        </HStack>
      </Container>
    </Link>
  )
}
