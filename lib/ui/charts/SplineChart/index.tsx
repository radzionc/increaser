import { normalize } from '@lib/utils/math/normalize'
import { useMemo } from 'react'
import { Point } from '../../entities/Point'
import styled, { useTheme } from 'styled-components'
import { transition } from '../../css/transition'

interface SplineChartProps {
  data: number[]
  height: number
  width: number
}

const calculateControlPoints = (dataPoints: Point[]) => {
  const controlPoints = []
  for (let i = 0; i < dataPoints.length - 1; i++) {
    const current = dataPoints[i]
    const next = dataPoints[i + 1]
    controlPoints.push({
      x: (current.x + next.x) / 2,
      y: (current.y + next.y) / 2,
    })
  }
  return controlPoints
}

const createPath = (
  points: Point[],
  controlPoints: Point[],
  width: number,
  height: number,
) => {
  let path = `M${points[0].x * width} ${height - points[0].y * height}`
  for (let i = 0; i < points.length - 1; i++) {
    const current = points[i]
    const next = points[i + 1]
    const control = controlPoints[i]
    path +=
      ` C${control.x * width} ${height - current.y * height},` +
      `${control.x * width} ${height - next.y * height},` +
      `${next.x * width} ${height - next.y * height}`
  }
  return path
}

const createClosedPath = (
  points: Point[],
  controlPoints: Point[],
  width: number,
  height: number,
) => {
  let path = `M${points[0].x * width} ${height}`
  path += ` L${points[0].x * width} ${height - points[0].y * height}`

  for (let i = 0; i < points.length - 1; i++) {
    const current = points[i]
    const next = points[i + 1]
    const control = controlPoints[i]
    path +=
      ` C${control.x * width} ${height - current.y * height},` +
      `${control.x * width} ${height - next.y * height},` +
      `${next.x * width} ${height - next.y * height}`
  }

  path += ` L${points[points.length - 1].x * width} ${height}`
  path += ' Z'

  return path
}

const Path = styled.path`
  ${transition}
`

export const SplineChart = ({ data, width, height }: SplineChartProps) => {
  const [path, closedPath] = useMemo(() => {
    if (data.length === 0) return ['', '']

    const normalizedData = normalize(data)
    const points = normalizedData.map((value, index) => ({
      x: index / (normalizedData.length - 1),
      y: value,
    }))

    const controlPoints = calculateControlPoints(points)
    return [
      createPath(points, controlPoints, width, height),
      createClosedPath(points, controlPoints, width, height),
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
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop
            offset="0%"
            stopColor={theme.colors.primary
              .getVariant({ a: () => 0.4 })
              .toCssValue()}
          />
          <stop
            offset="100%"
            stopColor={theme.colors.transparent.toCssValue()}
          />
        </linearGradient>
      </defs>
      <Path
        d={path}
        fill="none"
        stroke={theme.colors.primary.toCssValue()}
        strokeWidth="2"
      />
      <Path d={closedPath} fill="url(#gradient)" strokeWidth="0" />
    </svg>
  )
}
