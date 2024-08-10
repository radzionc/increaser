import { HStack } from '@lib/ui/layout/Stack'
import styled from 'styled-components'
import { takeWholeSpace } from '@lib/ui/css/takeWholeSpace'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { ComponentWithActiveState } from '@lib/ui/props'
import { getColor, matchColor } from '@lib/ui/theme/getters'
import { PressTracker } from '@lib/ui/base/PressTracker'
import { getSegmentIndex } from '@lib/utils/math/getSegmentIndex'
import { InvisibleHTMLSlider } from '@lib/ui/inputs/Slider/InvisibleHtmlSlider'
import { range } from '@lib/utils/array/range'
import { interactive } from '@lib/ui/css/interactive'
import { useTrackedTimeMaxDataSize } from '../hooks/useTrackedTimeMaxDataSize'
import { useCurrentDataSize } from '../hooks/useCurrentDataSize'
import { useDataSize } from './useDataSize'

const Container = styled(HStack)<ComponentWithActiveState>`
  ${takeWholeSpace};
  ${borderRadius.s};
  overflow: hidden;
  position: relative;
  padding: 2px;
  border: 2px solid
    ${matchColor('isActive', { true: 'primary', false: 'mistExtra' })};
`

const Content = styled(HStack)`
  ${takeWholeSpace};
  ${borderRadius.xs};
  overflow: hidden;
  gap: 1px;
  background: ${getColor('foregroundExtra')};
  ${interactive};
`

const Item = styled.div<ComponentWithActiveState>`
  flex: 1;
  height: 100%;

  background: ${matchColor('isActive', {
    true: 'primary',
    false: 'background',
  })};
`

export const DataSizeSlider = () => {
  const max = useTrackedTimeMaxDataSize()
  const value = useCurrentDataSize()
  const [dataSize, setValue] = useDataSize()

  const isActive = dataSize !== null

  return (
    <Container isActive={isActive} as="label">
      <InvisibleHTMLSlider
        step={1}
        value={value}
        onChange={setValue}
        min={1}
        max={max}
      />
      <PressTracker
        onChange={({ position }) => {
          if (position) {
            const newValue = getSegmentIndex(max, position.x) + 1
            if (newValue !== dataSize) {
              setValue(newValue)
            }
          }
        }}
        render={({ props }) => (
          <Content {...props}>
            {range(max).map((index) => {
              const isActive = index < value

              return <Item key={index} isActive={isActive} />
            })}
          </Content>
        )}
      />
    </Container>
  )
}
