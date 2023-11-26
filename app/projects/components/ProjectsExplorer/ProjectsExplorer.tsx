import styled from 'styled-components'
import { Line } from '@increaser/ui/layout/Line'
import { Panel } from '@increaser/ui/panel/Panel'
import { VStack } from '@increaser/ui/layout/Stack'

import { ProjectsNavigation } from './ProjectsNavigation'
import { SmallScreenProjectsNavigation } from './SmallScreenProjectsNavigation'
import { ResponsiveContent } from 'ui/ResponsiveContent'
import { ComponentWithChildrenProps } from '@increaser/ui/props'

const NormalContainer = styled.div`
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 20px;
  isolation: isolate;
  align-items: start;
`

const View = styled(Panel)`
  position: sticky;
  top: 0;
`

export const ProjectsExplorer = ({ children }: ComponentWithChildrenProps) => {
  return (
    <ResponsiveContent
      breakpoint={800}
      small={() => (
        <VStack alignItems="start" fullWidth gap={20}>
          <SmallScreenProjectsNavigation />
          <Line />
          {children}
        </VStack>
      )}
      normal={() => (
        <NormalContainer>
          <ProjectsNavigation />
          <View>{children}</View>
        </NormalContainer>
      )}
    />
  )
}
