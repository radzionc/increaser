import React, { useMemo } from 'react'
import { formatDuration } from '@lib/utils/time/formatDuration'
import { sum } from '@lib/utils/array/sum'
import styled, { useTheme } from 'styled-components'
import { Text } from '@lib/ui/text'
import { useProjects } from '@increaser/ui/projects/ProjectsProvider'
import { useTrackedTimeReport } from './TrackedTimeReportProvider'
import { SeparatedByLine } from '@lib/ui/layout/SeparatedByLine'
import { VStack } from '@lib/ui/layout/Stack'
import { round } from '@lib/ui/css/round'
import { order } from '@lib/utils/array/order'
import { toPercents } from '@lib/utils/toPercents'

const Row = styled.div`
  display: grid;
  grid-gap: 8px;
  grid-template-columns: 8px 120px 80px 80px 80px;
  align-items: center;
  font-size: 14px;
`

const Circle = styled.div`
  ${round};
  aspect-ratio: 1 / 1;
  width: 100%;
`

export const ProjectsDistributionBreakdown = () => {
  const { projectsRecord } = useProjects()
  const { projectsData, activeProjectId } = useTrackedTimeReport()

  const { colors } = useTheme()

  const total = useMemo(
    () => sum(Object.values(projectsData).flat()),
    [projectsData],
  )

  if (!total) return null

  const items = order(
    Object.entries(projectsData),
    ([, data]) => sum(data),
    'desc',
  ).filter(([, data]) => sum(data) > 0)

  return (
    <SeparatedByLine gap={8}>
      <Row>
        <Circle style={{ background: colors.mist.toCssValue() }} />
        <Text cropped color="shy">
          Project
        </Text>
        <Text color="shy" weight="semibold">
          Total
        </Text>
        <Text color="shy" weight="semibold">
          Average
        </Text>
        <Text color="shy" weight="semibold">
          Share
        </Text>
      </Row>
      <VStack gap={8}>
        {items.map(([id, data]) => {
          const seconds = sum(data)
          const isPrimary = !activeProjectId || activeProjectId === id
          const statColor = activeProjectId
            ? activeProjectId === id
              ? 'contrast'
              : 'supporting'
            : 'regular'
          return (
            <Row key={id}>
              <Circle
                style={{
                  background: (isPrimary
                    ? colors.getLabelColor(projectsRecord[id].color)
                    : colors.mist
                  ).toCssValue(),
                }}
              />
              <Text cropped>{projectsRecord[id].name}</Text>
              <Text color={statColor} weight="semibold">
                {formatDuration(seconds, 's', {
                  maxUnit: 'h',
                })}
              </Text>
              <Text color={statColor} weight="semibold">
                {formatDuration(seconds / data.length, 's', {
                  maxUnit: 'h',
                })}
              </Text>
              <Text color={statColor} weight="semibold">
                {toPercents(seconds / total, 'round')}
              </Text>
            </Row>
          )
        })}
      </VStack>
      <Row>
        <div />
        <div />
        <Text
          color={activeProjectId ? 'supporting' : 'contrast'}
          weight="semibold"
        >
          {formatDuration(total, 's', {
            maxUnit: 'h',
          })}
        </Text>
        <Text
          color={activeProjectId ? 'supporting' : 'contrast'}
          weight="semibold"
        >
          {formatDuration(total / Object.values(projectsData)[0].length, 's', {
            maxUnit: 'h',
          })}
        </Text>
        <Text
          color={activeProjectId ? 'supporting' : 'contrast'}
          weight="semibold"
        >
          100%
        </Text>
      </Row>
    </SeparatedByLine>
  )
}
