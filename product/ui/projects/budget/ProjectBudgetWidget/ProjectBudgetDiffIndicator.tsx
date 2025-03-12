import { borderRadius } from '@lib/ui/css/borderRadius'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { useCurrentProject } from '@product/ui/projects/CurrentProjectProvider'
import styled from 'styled-components'

import { useProjectBudgetOffsetColor } from '../hooks/useProjectBudgetOffsetColor'

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
