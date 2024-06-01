import { ElementSizeAware } from '@lib/ui/base/ElementSizeAware'
import { createSharpClosedPath } from '@lib/ui/charts/LineChart/utils/createSharpClosedPath'
import { range } from '@lib/utils/array/range'
import { Dimensions } from '@lib/utils/entities/Dimensions'
import styled, { useTheme } from 'styled-components'

const Container = styled.div`
  padding: 0;
  width: 100%;
  height: 20px;
`

const Spacer = styled.div`
  padding: 0;
  height: 20px;
`

const generatePath = ({ width, height }: Dimensions) => {
  const data = [...range(10).flatMap(() => [1, 0]), 1]

  const points = data.map((value, index) => ({
    x: index / (data.length - 1),
    y: value,
  }))

  return createSharpClosedPath(points, width, height)
}

export const PaddleIFrameTransition = () => {
  const { colors } = useTheme()
  const separatorColor = colors.contrast

  return (
    <>
      <Spacer />

      <ElementSizeAware
        render={({ setElement, size }) => (
          <Container ref={setElement}>
            {size && (
              <svg {...size} viewBox={`0 0 ${size.width} ${size.height}`}>
                <path
                  d={generatePath(size)}
                  fill={separatorColor.toCssValue()}
                  strokeWidth="0"
                />
              </svg>
            )}
          </Container>
        )}
      />
      <Spacer
        style={{
          background: separatorColor.toCssValue(),
        }}
      />
    </>
  )
}
