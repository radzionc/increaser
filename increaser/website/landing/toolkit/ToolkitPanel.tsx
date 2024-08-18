import { UniformColumnGrid } from '@lib/ui/css/uniformColumnGrid'
import styled from 'styled-components'
import { ToolkitItem } from './ToolkitItem'
import { productTools } from '@increaser/entities/ProductTool'

const Content = styled(UniformColumnGrid)`
  max-width: 620px;
  width: 100%;
`

export const ToolkitPanel = () => {
  return (
    <Content minChildrenWidth={180} gap={8}>
      {productTools.map((tool) => (
        <ToolkitItem key={tool} value={tool} />
      ))}
    </Content>
  )
}
