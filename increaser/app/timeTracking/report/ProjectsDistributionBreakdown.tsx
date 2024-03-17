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
import { EmphasizeNumbers } from '@lib/ui/text/EmphasizeNumbers'

const Row = styled.div`
  display: grid;
  grid-gap: 8px;
  grid-template-columns: 8px 120px 80px 80px 80px;
  align-items: center;
  font-size: 14px;

  > * {
    &:last-child,
    &:nth-last-child(2),
    &:nth-last-child(3) {
      justify-self: end;
    }
  }
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

  const summaryColor = activeProjectId ? 'shy' : 'contrast'

  return (
    <VStack gap={16}>
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
      <SeparatedByLine gap={12}>
        <VStack gap={12}>
          {items.map(([id, data]) => {
            const seconds = sum(data)
            const isPrimary = !activeProjectId || activeProjectId === id
            const statColor = activeProjectId
              ? activeProjectId === id
                ? 'contrast'
                : 'shy'
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
                <Text color={statColor} cropped>
                  {projectsRecord[id].name}
                </Text>
                <Text color={statColor} weight="semibold">
                  <EmphasizeNumbers
                    value={formatDuration(seconds, 's', {
                      maxUnit: 'h',
                    })}
                  />
                </Text>
                <Text color={statColor} weight="semibold">
                  <EmphasizeNumbers
                    value={formatDuration(seconds / data.length, 's', {
                      maxUnit: 'h',
                      kind: 'short',
                    })}
                  />
                </Text>
                <Text color={statColor} weight="semibold">
                  <EmphasizeNumbers
                    value={toPercents(seconds / total, 'round')}
                  />
                </Text>
              </Row>
            )
          })}
        </VStack>
        <Row>
          <div />
          <div />
          <Text color={summaryColor} weight="semibold">
            <EmphasizeNumbers
              value={formatDuration(total, 's', {
                maxUnit: 'h',
              })}
            />
          </Text>
          <Text color={summaryColor} weight="semibold">
            <EmphasizeNumbers
              value={formatDuration(
                total / Object.values(projectsData)[0].length,
                's',
                {
                  maxUnit: 'h',
                },
              )}
            />
          </Text>
          <Text color={summaryColor} weight="semibold">
            <EmphasizeNumbers value="100%" />
          </Text>
        </Row>
      </SeparatedByLine>
    </VStack>
  )
}
