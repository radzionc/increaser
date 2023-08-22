import { TimelineSession } from 'focus/components/TimelineSession'
import React from 'react'
import {
  getBlockDuration,
  getBlockWorkDuration,
  getBlocks,
  getDistanceBetweenBlocks,
} from 'sets/Block'
import { getSetDuration } from 'sets/helpers/getSetDuration'
import { useTodaySets } from 'sets/hooks/useTodaySets'
import { formatDuration } from 'shared/utils/formatDuration'
import { sum } from 'shared/utils/sum'
import { toPercents } from 'shared/utils/toPercents'
import styled, { useTheme } from 'styled-components'
import { TitledSection } from '@increaser/ui/ui/Layout/TitledSection'
import { HStack, VStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'
import { centerContentCSS } from '@increaser/ui/ui/utils/centerContentCSS'
import { MS_IN_HOUR, MS_IN_MIN } from 'utils/time'

import { BlockBoundaries } from './BlockBoundaries'
import { getLastItem } from '@increaser/utils/getLastItem'

const Distance = styled.div`
  padding-right: 8px;
  border-right: 1px dashed;
  ${centerContentCSS};
  right: 0;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textShy.toCssValue()};
`

const blockDuratinSuccessInMin = 80

const Container = styled.div`
  position: relative;
`

export const TodaySets = () => {
  const sets = useTodaySets()

  const { colors } = useTheme()

  if (!sets.length) return null

  const timelineStartedAt = sets[0].start
  const timelineEndsAt = getLastItem(sets).end
  const timelineDuration = timelineEndsAt - timelineStartedAt

  const blocks = getBlocks(sets)
  const avgBlockDuration = sum(blocks.map(getBlockWorkDuration)) / blocks.length

  return (
    <TitledSection
      title={
        <VStack gap={4}>
          <HStack alignItems="center" gap={8}>
            <Text color="regular">Avg. block</Text>
            <Text
              color={
                avgBlockDuration / MS_IN_MIN < blockDuratinSuccessInMin
                  ? 'supporting'
                  : 'success'
              }
              as="span"
            >
              {formatDuration(avgBlockDuration, 'ms')}
            </Text>
          </HStack>
        </VStack>
      }
    >
      <Container style={{ height: (timelineDuration / MS_IN_HOUR) * 60 }}>
        {blocks.map((block, index) => {
          const blockDuration = getBlockDuration(block)

          const { sets } = block

          const nextBlock = blocks[index + 1]

          return (
            <React.Fragment key={index}>
              {sets.map((set, index) => {
                const height = getSetDuration(set) / timelineDuration

                const top = (set.start - timelineStartedAt) / timelineDuration

                const style = {
                  height: toPercents(height),
                  top: toPercents(top),
                }

                return (
                  <TimelineSession
                    $color={colors.mist}
                    key={index}
                    style={style}
                  />
                )
              })}
              <BlockBoundaries
                block={block}
                style={{
                  top: toPercents(
                    (sets[0].start - timelineStartedAt) / timelineDuration,
                  ),
                  height: toPercents(blockDuration / timelineDuration),
                }}
              />
              {nextBlock && (
                <Distance
                  style={{
                    position: 'absolute',
                    top: toPercents(
                      (getLastItem(sets).end - timelineStartedAt) /
                        timelineDuration,
                    ),
                    height: toPercents(
                      getDistanceBetweenBlocks(block, nextBlock) /
                        timelineDuration,
                    ),
                  }}
                >
                  {formatDuration(
                    getDistanceBetweenBlocks(block, nextBlock),
                    'ms',
                  )}{' '}
                </Distance>
              )}
            </React.Fragment>
          )
        })}
      </Container>
    </TitledSection>
  )
}
