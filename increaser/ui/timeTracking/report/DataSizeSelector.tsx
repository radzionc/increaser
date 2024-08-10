import { useTrackedTimeMaxDataSize } from './hooks/useTrackedTimeMaxDataSize'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import { MaxDataSizeSelector } from './MaxDataSizeSelector'
import styled from 'styled-components'
import { DataSizeSlider } from './DataSizeSlider'
import { ShySection } from '@lib/ui/layout/ShySection'

const Content = styled(HStack)`
  width: 100%;
  height: 32px;
  gap: 8px;
  align-items: center;
`

const Container = styled(VStack)`
  justify-content: center;
`

export const DataSizeSelector = () => {
  const max = useTrackedTimeMaxDataSize()

  if (max < 2) return null

  return (
    <Container>
      <ShySection title="Interval">
        <Content>
          <DataSizeSlider />
          <MaxDataSizeSelector />
        </Content>
      </ShySection>
    </Container>
  )
}
