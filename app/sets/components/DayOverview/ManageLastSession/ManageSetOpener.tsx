import { interactive } from '@increaser/ui/css/interactive'
import { HStack } from '@increaser/ui/layout/Stack'
import { transition } from '@increaser/ui/css/transition'
import { MoreHorizontalIcon } from '@increaser/ui/icons/MoreHorizontalIcon'
import { getColor } from '@increaser/ui/theme/getters'
import { centerContent } from '@increaser/ui/css/centerContent'
import { toPercents } from '@increaser/utils/toPercents'
import { getProjectEmoji } from 'projects/utils/getProjectEmoji'
import styled, { useTheme } from 'styled-components'
import { horizontalPaddingInPx } from '../config'
import { Text } from '@increaser/ui/text'
import { useProjects } from 'projects/hooks/useProjects'
import { RenderOpenerProps } from '@increaser/ui/menu/PopoverMenu'
import { Set } from '@increaser/entities/User'
import { useDayOverview } from '../DayOverviewProvider'
import { formatDuration } from '@increaser/utils/time/formatDuration'
import { getProjectColor } from 'projects/utils/getProjectColor'
import { convertDuration } from '@increaser/utils/time/convertDuration'

const offsetInPx = 4

const Container = styled.div`
  ${interactive}
  position: absolute;
  right: ${horizontalPaddingInPx}px;
  border-radius: 8px;
  padding: 4px 8px;
  ${centerContent};
  font-size: 14px;
  border: 2px solid;
  background: ${getColor('background')};
  color: ${getColor('text')};
  ${transition};
  :hover {
    color: ${getColor('contrast')};
  }
`

interface ManageSetOpener {
  set: Set
  openerProps: RenderOpenerProps
}

export const ManageSetOpener = ({ set, openerProps }: ManageSetOpener) => {
  const { projectsRecord } = useProjects()
  const { start, end, projectId } = set
  const { startHour, endHour, dayStartedAt } = useDayOverview()
  const timespan = convertDuration(endHour - startHour, 'h', 'ms')
  const timelineStartsAt = dayStartedAt + convertDuration(startHour, 'h', 'ms')

  const theme = useTheme()
  const color = getProjectColor(projectsRecord, theme, projectId)

  return (
    <Container
      {...openerProps}
      style={{
        top: `calc(${toPercents(
          (end - timelineStartsAt) / timespan,
        )} + ${offsetInPx}px)`,
        borderColor: color.toCssValue(),
      }}
    >
      <HStack alignItems="center" gap={8}>
        <Text>{getProjectEmoji(projectsRecord, projectId)}</Text>
        <Text weight="semibold">{formatDuration(end - start, 'ms')}</Text>
        <MoreHorizontalIcon />
      </HStack>
    </Container>
  )
}
