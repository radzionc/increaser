import React, { useMemo } from 'react'
import { formatDuration } from '@lib/utils/time/formatDuration'
import { sum } from '@lib/utils/array/sum'
import styled, { css, useTheme } from 'styled-components'
import { Text } from '@lib/ui/text'
import { useProjects } from '@increaser/ui/projects/ProjectsProvider'
import { useTrackedTimeReport } from './TrackedTimeReportProvider'
import { SeparatedByLine } from '@lib/ui/layout/SeparatedByLine'
import { VStack } from '@lib/ui/layout/Stack'
import { round } from '@lib/ui/css/round'
import { order } from '@lib/utils/array/order'
import { toPercents } from '@lib/utils/toPercents'
import { EmphasizeNumbers } from '@lib/ui/text/EmphasizeNumbers'
import { transition } from '@lib/ui/css/transition'
import { interactive } from '@lib/ui/css/interactive'
import { getColor } from '@lib/ui/theme/getters'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { verticalPadding } from '@lib/ui/css/verticalPadding'
import { horizontalPadding } from '@lib/ui/css/horizontalPadding'

const InteractiveRow = styled.div<{ isActive: boolean }>`
  ${transition}
  ${interactive}
  ${borderRadius.s};

  ${({ isActive }) =>
    isActive
      ? css`
          color: ${getColor('contrast')};
          background: ${getColor('mist')};
        `
      : css`
          color: ${getColor('textSupporting')};
          &:hover {
            background: ${getColor('mist')};
          }
        `};
`

const RowContent = styled.div`
  display: grid;
  grid-gap: 8px;
  grid-template-columns: 8px 120px repeat(3, 92px);
  align-items: center;
  font-size: 14px;
  ${verticalPadding(6)};
  ${horizontalPadding(8)};

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
  const { projectsData, activeProjectId, setState, timeGrouping } =
    useTrackedTimeReport()

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
    <VStack style={{ alignSelf: 'center' }} gap={16}>
      <RowContent>
        <div />
        <Text cropped color="shy">
          Project
        </Text>
        <Text color="shy" weight="semibold">
          Total
        </Text>
        <Text color="shy" weight="semibold">
          Avg. {timeGrouping}
        </Text>
        <Text color="shy" weight="semibold">
          Share
        </Text>
      </RowContent>
      <SeparatedByLine gap={12}>
        <VStack gap={2}>
          {items.map(([id, data]) => {
            const seconds = sum(data)
            const isPrimary = !activeProjectId || activeProjectId === id
            return (
              <InteractiveRow
                onClick={() =>
                  setState((state) => ({
                    ...state,
                    activeProjectId: id,
                  }))
                }
                isActive={activeProjectId === id}
              >
                <RowContent key={id}>
                  <Circle
                    style={{
                      background: (isPrimary
                        ? colors.getLabelColor(projectsRecord[id].color)
                        : colors.mist
                      ).toCssValue(),
                    }}
                  />
                  <Text cropped>{projectsRecord[id].name}</Text>
                  <Text weight="semibold">
                    <EmphasizeNumbers
                      value={formatDuration(seconds, 's', {
                        maxUnit: 'h',
                      })}
                    />
                  </Text>
                  <Text weight="semibold">
                    <EmphasizeNumbers
                      value={formatDuration(seconds / data.length, 's', {
                        maxUnit: 'h',
                        kind: 'short',
                      })}
                    />
                  </Text>
                  <Text weight="semibold">
                    <EmphasizeNumbers
                      value={toPercents(seconds / total, 'round')}
                    />
                  </Text>
                </RowContent>
              </InteractiveRow>
            )
          })}
        </VStack>
        <InteractiveRow
          onClick={() =>
            setState((state) => ({
              ...state,
              activeProjectId: null,
            }))
          }
          isActive={!activeProjectId}
        >
          <RowContent>
            <div />
            <Text weight="semibold">All projects</Text>
            <Text weight="semibold">
              <EmphasizeNumbers
                value={formatDuration(total, 's', {
                  maxUnit: 'h',
                })}
              />
            </Text>
            <Text weight="semibold">
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
            <Text weight="semibold">
              <EmphasizeNumbers value="100%" />
            </Text>
          </RowContent>
        </InteractiveRow>
      </SeparatedByLine>
    </VStack>
  )
}
