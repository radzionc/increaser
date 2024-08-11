import { useTrackedTimeMaxDataSize } from '../hooks/useTrackedTimeMaxDataSize'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import styled from 'styled-components'
import { useCurrentDataSize } from '../hooks/useCurrentDataSize'
import { pluralize } from '@lib/utils/pluralize'
import { useTimeGrouping } from '../timeGrouping/useTimeGrouping'
import { DataSizeSlider } from './DataSizeSlider'
import { MaxDataSizeSelector } from './MaxDataSizeSelector'
import { LabelText } from '@lib/ui/inputs/LabelText'

const Content = styled(HStack)`
  width: 100%;
  height: 32px;
  gap: 8px;
  align-items: center;
`

const Container = styled(VStack)`
  justify-content: center;
  gap: 8px;
`

export const DataSizeSelector = () => {
  const max = useTrackedTimeMaxDataSize()

  const dataSize = useCurrentDataSize()
  const [timeGrouping] = useTimeGrouping()

  if (max < 2) return null

  return (
    <Container>
      <LabelText color="supporting">
        Interval: {pluralize(dataSize, timeGrouping)}
      </LabelText>
      <Content>
        <DataSizeSlider />
        <MaxDataSizeSelector />
      </Content>
    </Container>
  )
}
