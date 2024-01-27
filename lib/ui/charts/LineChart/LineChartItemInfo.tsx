import styled from 'styled-components'
import { ElementSizeAware } from '../../base/ElementSizeAware'
import { defaultTransition } from '../../css/transition'

type LineChartItemInfoProps = {
  containerWidth: number
  data: number[]
  isVisible: boolean
  itemIndex: number
  render: (itemIndex: number) => React.ReactNode
}

const Container = styled.div`
  width: 100%;
`

const Content = styled.div`
  width: fit-content;
  opacity: 1;
  white-space: nowrap;
  transition: ${defaultTransition} opacity;
`

export const LineChartItemInfo = ({
  data,
  itemIndex,
  render,
  containerWidth,
  isVisible,
}: LineChartItemInfoProps) => {
  return (
    <Container>
      <ElementSizeAware
        render={({ setElement, size }) => {
          const getStyle = (): React.CSSProperties => {
            if (!size) {
              return {
                visibility: 'hidden',
              }
            }

            const center = itemIndex * (containerWidth / (data.length - 1))
            const contentHalfWidth = size.width / 2
            if (center < contentHalfWidth) {
              return { marginLeft: 0 }
            }

            if (containerWidth - center < contentHalfWidth) {
              return { marginLeft: 'auto' }
            }

            return {
              marginLeft: center - contentHalfWidth,
            }
          }

          return (
            <Content
              ref={setElement}
              style={{
                ...getStyle(),
                opacity: isVisible ? 1 : 0,
              }}
            >
              {render(itemIndex)}
            </Content>
          )
        }}
      />
    </Container>
  )
}
