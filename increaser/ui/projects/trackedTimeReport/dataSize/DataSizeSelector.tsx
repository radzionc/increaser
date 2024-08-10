import { useTrackedTimeMaxDataSize } from '../hooks/useTrackedTimeMaxDataSize'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import styled from 'styled-components'
import { ShySection } from '@lib/ui/layout/ShySection'
import { useCurrentDataSize } from '../hooks/useCurrentDataSize'
import { pluralize } from '@lib/utils/pluralize'
import { useTimeGrouping } from '../timeGrouping/useTimeGrouping'
import { DataSizeSlider } from './DataSizeSlider'
import { MaxDataSizeSelector } from './MaxDataSizeSelector'

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

  const dataSize = useCurrentDataSize()
  const [timeGrouping] = useTimeGrouping()

  if (max < 2) return null

  return (
    <Container>
      <ShySection title={`Interval: ${pluralize(dataSize, timeGrouping)}`}>
        <Content>
          <DataSizeSlider />
          <MaxDataSizeSelector />
        </Content>
      </ShySection>
    </Container>
  )
}
