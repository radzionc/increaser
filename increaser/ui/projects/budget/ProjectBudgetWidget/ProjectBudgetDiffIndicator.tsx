import styled from 'styled-components'
import { useCurrentProject } from '@increaser/ui/projects/CurrentProjectProvider'

import { useProjectBudgetOffsetColor } from '../hooks/useProjectBudgetOffsetColor'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { sameDimensions } from '@lib/ui/css/sameDimensions'

const Container = styled.div`
  ${sameDimensions(12)};
  ${borderRadius.xs};
`

export const ProjectBudgetDiffIndicator = () => {
  const { id } = useCurrentProject()

  const color = useProjectBudgetOffsetColor(id)

  return (
    <Container
      style={{
        background: color.toCssValue(),
      }}
    />
  )
}
