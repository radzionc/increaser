import { uniformColumnGrid } from '@lib/ui/css/uniformColumnGrid'
import styled from 'styled-components'
import { ToolkitItem } from './ToolkitItem'
import { productTools } from '@increaser/entities/ProductTool'
import { getColor } from '@lib/ui/theme/getters'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { centerContent } from '@lib/ui/css/centerContent'
import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { vStack } from '@lib/ui/css/stack'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { text } from '@lib/ui/text'

const Container = styled.div`
  position: relative;
  ${uniformColumnGrid({
    fullWidth: true,
    maxColumns: 3,
    gap: 8,
    minChildrenWidth: 120,
  })}
`

const titleHeight = 20

const Title = styled.div`
  position: absolute;
  top: -${toSizeUnit(titleHeight / 2)};
  height: ${toSizeUnit(titleHeight)};

  ${horizontalPadding(20)}

  ${text({
    color: 'primary',
    size: 16,
    weight: 600,
  })}

  background: ${getColor('background')};

  ${centerContent};
`

const Wrapper = styled.div`
  padding: 40px;
  position: relative;
  ${vStack({
    alignItems: 'center',
  })}

  border: 2px dashed ${getColor('primary')};

  ${borderRadius.m}

  @media (max-width: 800px) {
    padding: 24px;
  }
`

export const ToolkitPanel = () => {
  return (
    <Wrapper>
      <Container>
        {productTools.map((tool) => (
          <ToolkitItem key={tool} value={tool} />
        ))}
      </Container>
      <Title>Increaser Protocol</Title>
    </Wrapper>
  )
}
