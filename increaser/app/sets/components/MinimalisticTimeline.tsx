import { useProjects } from '@increaser/app/projects/hooks/useProjects'
import { getProjectColor } from '@increaser/app/projects/utils/getProjectColor'
import { getSetDuration } from '@increaser/app/sets/helpers/getSetDuration'
import { Set } from '@increaser/app/sets/Set'
import { formatDuration } from '@lib/utils/time/formatDuration'
import { formatTime } from '@lib/utils/time/formatTime'
import { toPercents } from '@lib/utils/toPercents'
import styled, { useTheme } from 'styled-components'
import { HSLA } from '@lib/ui/colors/HSLA'
import { ArrowRightIcon } from '@lib/ui/icons/ArrowRightIcon'
import { Panel } from '@lib/ui/panel/Panel'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import { ArrowLeftIcon } from '@lib/ui/icons/ArrowLeftIcon'
import { getLastItem } from '@lib/utils/array/getLastItem'

interface Props {
  sets: Set[]
}

const Session = styled.div<{ $color: HSLA }>`
  background: ${({ $color }) => $color.toCssValue()};
  position: absolute;
  height: 100%;
`

const Container = styled(Panel)`
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 0px;
  height: 72px;
`

export const MinimalisticTimeline = ({ sets }: Props) => {
  const startedAt = sets[0].start
  const finishedAt = getLastItem(sets).end
  const duration = finishedAt - startedAt

  const theme = useTheme()
  const { projectsRecord } = useProjects()

  return (
    <VStack gap={4}>
      <Container>
        {sets.map((set, index) => (
          <Session
            key={index}
            style={{
              left: toPercents((set.start - startedAt) / duration),
              width: toPercents(getSetDuration(set) / duration),
            }}
            $color={getProjectColor(projectsRecord, theme, set.projectId)}
          />
        ))}
      </Container>
      <Text as="div" color="supporting" size={12}>
        <HStack fullWidth justifyContent="space-between">
          <Text color="supporting" size={14}>
            {formatTime(startedAt)}
          </Text>
          <HStack alignItems="center" gap={4}>
            <ArrowLeftIcon />
            <Text size={14}>
              {formatDuration(finishedAt - startedAt, 'ms')} workday
            </Text>
            <ArrowRightIcon />
          </HStack>
          <Text color="supporting" size={14}>
            {formatTime(finishedAt)}
          </Text>
        </HStack>
      </Text>
    </VStack>
  )
}
