import { HStack, VStack } from '@lib/ui/layout/Stack'
import styled from 'styled-components'
import { useCurrentDataSize } from '../hooks/useCurrentDataSize'
import { pluralize } from '@lib/utils/pluralize'
import { useTimeGrouping } from '../timeGrouping/useTimeGrouping'
import { DataSizeSlider } from './DataSizeSlider'
import { MaxDataSizeSelector } from './MaxDataSizeSelector'
import { LabelText } from '@lib/ui/inputs/LabelText'
import { inputContainer } from '@lib/ui/css/inputContainer'
import { useMaxDataSize } from './useMaxDataSize'

const Content = styled(HStack)`
  width: 100%;
  height: 32px;
  gap: 8px;
  align-items: center;
`

const Container = styled(VStack)`
  ${inputContainer};
  justify-content: center;
`

export const DataSizeSelector = () => {
  const max = useMaxDataSize()

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
