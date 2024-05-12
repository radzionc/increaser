import { UniformColumnGrid } from '@lib/ui/layout/UniformColumnGrid'
import styled from 'styled-components'
import { tools } from './tools'
import { ToolkitItem } from './ToolkitItem'

const Content = styled(UniformColumnGrid)`
  max-width: 620px;
  width: 100%;
`

export const ToolkitPanel = () => {
  return (
    <Content minChildrenWidth={180} gap={8}>
      {tools.map((tool) => (
        <ToolkitItem key={tool} value={tool} />
      ))}
    </Content>
  )
}
