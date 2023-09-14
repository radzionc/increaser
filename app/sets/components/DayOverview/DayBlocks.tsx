import { getBlockDuration, getBlocks } from 'sets/Block'
import { useDayOverview } from './DayOverviewProvider'
import React from 'react'
import { BlockBoundaries } from '../BlockBoundaries'
import { toPercents } from '@increaser/utils/toPercents'
import { getSetDuration } from '@increaser/entities-utils/set/getSetDuration'
import { getProjectColor } from 'projects/utils/getProjectColor'
import { useProjects } from 'projects/hooks/useProjects'
import styled, { useTheme } from 'styled-components'
import { useFocus } from 'focus/hooks/useFocus'
import { ManageLastSet } from 'focus/components/ManageLastSet'
import {
  SessionProjectIdentifier,
  TimelineSession,
} from 'focus/components/TimelineSession'
import {
  horizontalPaddingInPx,
  timeLabelGapInPx,
  timeLabelWidthInPx,
} from './config'

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  padding-left: ${horizontalPaddingInPx +
  timeLabelWidthInPx +
  timeLabelGapInPx}px;
  padding-right: ${horizontalPaddingInPx}px;
`

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`

export const DayBlocks = () => {
  const { sets, timelineStartsAt, timelineEndsAt } = useDayOverview()

  const timespan = timelineEndsAt - timelineStartsAt

  const blocks = getBlocks(sets)

  const { projectsRecord } = useProjects()

  const theme = useTheme()

  const { currentSet } = useFocus()

  return (
    <Wrapper>
      <Container>
        {blocks.map((block, index) => {
          const blockDuration = getBlockDuration(block)

          const { sets } = block

          const isLastBlock = index === blocks.length - 1

          return (
            <React.Fragment key={index}>
              <BlockBoundaries
                block={block}
                style={{
                  top: `calc(${toPercents(
                    (sets[0].start - timelineStartsAt) / timespan,
                  )} - 2px)`,
                  height: `calc(${toPercents(blockDuration / timespan)} + 4px)`,
                  left: -2,
                  width: `calc(100% + 4px)`,
                }}
              />
              {sets.map((set, index) => {
                const height = getSetDuration(set) / timespan

                const top = (set.start - timelineStartsAt) / timespan

                const style = {
                  height: toPercents(height),
                  top: toPercents(top),
                }

                const isLastSet = index === sets.length - 1

                const color = getProjectColor(
                  projectsRecord,
                  theme,
                  set.projectId,
                )

                if (!currentSet && isLastBlock && isLastSet) {
                  return (
                    <ManageLastSet
                      key="manage"
                      set={set}
                      color={color}
                      style={style}
                    />
                  )
                }

                return (
                  <TimelineSession
                    $color={theme.colors.mist}
                    key={index}
                    style={style}
                  >
                    {!currentSet && <SessionProjectIdentifier $color={color} />}
                  </TimelineSession>
                )
              })}
            </React.Fragment>
          )
        })}
      </Container>
    </Wrapper>
  )
}
