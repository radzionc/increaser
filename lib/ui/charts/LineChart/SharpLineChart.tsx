import { useMemo } from 'react'
import { Point } from '../../entities/Point'
import styled, { useTheme } from 'styled-components'
import { transition } from '../../css/transition'
import { HSLA } from '../../colors/HSLA'
import { match } from '@lib/utils/match'
import { Match } from '../../base/Match'

type LineChartFillKind = 'gradient' | 'solid'

interface LineChartProps {
  data: number[]
  height: number
  width: number
  color: HSLA
  fillKind?: LineChartFillKind
}

const createPath = (points: Point[], width: number, height: number) => {
  let path = `M${points[0].x * width} ${height - points[0].y * height}`
  for (let i = 1; i < points.length; i++) {
    const point = points[i]
    path += ` L${point.x * width} ${height - point.y * height}`
  }
  return path
}

const createClosedPath = (points: Point[], width: number, height: number) => {
  let path = `M${points[0].x * width} ${height}`
  path += ` L${points[0].x * width} ${height - points[0].y * height}`

  for (let i = 1; i < points.length; i++) {
    const point = points[i]
    path += ` L${point.x * width} ${height - point.y * height}`
  }

  path += ` L${points[points.length - 1].x * width} ${height}`
  path += ' Z'

  return path
}

const Path = styled.path`
  ${transition}
`

export const SharpLineChart = ({
  data,
  width,
  height,
  color,
  fillKind = 'gradient',
}: LineChartProps) => {
  const [path, closedPath] = useMemo(() => {
    if (data.length === 0) return ['', '']

    const points = data.map((value, index) => ({
      x: index / (data.length - 1),
      y: value,
    }))

    return [
      createPath(points, width, height),
      createClosedPath(points, width, height),
    ]
  }, [data, height, width])

  const theme = useTheme()

  return (
    <svg
      style={{ minWidth: width, overflow: 'visible' }}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
    >
      <Path d={path} fill="none" stroke={color.toCssValue()} strokeWidth="2" />
      <Match
        value={fillKind}
        gradient={() => (
          <>
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop
                  offset="0%"
                  stopColor={color.getVariant({ a: () => 0.4 }).toCssValue()}
                />
                <stop
                  offset="100%"
                  stopColor={theme.colors.transparent.toCssValue()}
                />
              </linearGradient>
            </defs>
          </>
        )}
        solid={() => (
          <>
            <Path
              d={closedPath}
              fill={theme.colors.background.toCssValue()}
              strokeWidth="0"
            />
          </>
        )}
      />
      <Path
        d={closedPath}
        fill={match(fillKind, {
          gradient: () => 'url(#gradient)',
          solid: () => color.getVariant({ a: () => 0.4 }).toCssValue(),
        })}
        strokeWidth="0"
      />
    </svg>
  )
}
