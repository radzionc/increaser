import { useProjects } from 'projects/hooks/useProjects'
import { getProjectColor } from 'projects/utils/getProjectColor'
import { getSetDuration } from 'sets/helpers/getSetDuration'
import { Set } from 'sets/Set'
import { formatDuration } from 'shared/utils/formatDuration'
import { formatTime } from 'shared/utils/formatTime'
import { getLast } from 'shared/utils/getLast'
import { toPercents } from 'shared/utils/toPercents'
import styled, { useTheme } from 'styled-components'
import { HSLA } from '@increaser/ui/ui/colors/HSLA'
import { ArrowRightIcon } from '@increaser/ui/ui/icons/ArrowRightIcon'
import { Panel } from '@increaser/ui/ui/Panel/Panel'
import { HStack, VStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'
import { ArrowLeftIcon } from '@increaser/ui/ui/icons/ArrowLeftIcon'

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
  const finishedAt = getLast(sets).end
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
