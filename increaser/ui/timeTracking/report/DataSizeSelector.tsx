import { useTrackedTimeMaxDataSize } from './hooks/useTrackedTimeMaxDataSize'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import { MaxDataSizeSelector } from './MaxDataSizeSelector'
import styled from 'styled-components'
import { DataSizeSlider } from './DataSizeSlider'
import { ShySection } from '@lib/ui/layout/ShySection'
import { useCurrentDataSize } from './hooks/useCurrentDataSize'
import { pluralize } from '@lib/utils/pluralize'
import { useTrackedTimeReportPreferences } from './state/useTrackedTimeReportPreferences'

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
  const [{ timeGrouping }] = useTrackedTimeReportPreferences()

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
