import { interactive } from '@increaser/ui/css/interactive'
import { HStack } from '@increaser/ui/ui/Stack'
import { defaultTransitionCSS } from '@increaser/ui/ui/animations/transitions'
import { MoreHorizontalIcon } from '@increaser/ui/icons/MoreHorizontalIcon'
import { getColor } from '@increaser/ui/ui/theme/getters'
import { centerContentCSS } from '@increaser/ui/ui/utils/centerContentCSS'
import { toPercents } from '@increaser/utils/toPercents'
import { getProjectEmoji } from 'projects/utils/getProjectEmoji'
import styled, { useTheme } from 'styled-components'
import { horizontalPaddingInPx } from '../config'
import { Text } from '@increaser/ui/ui/Text'
import { useProjects } from 'projects/hooks/useProjects'
import { RenderOpenerProps } from '@increaser/ui/ui/Menu/PopoverMenu'
import { Set } from '@increaser/entities/User'
import { useDayOverview } from '../DayOverviewProvider'
import { formatDuration } from '@increaser/utils/time/formatDuration'
import { getProjectColor } from 'projects/utils/getProjectColor'

const offsetInPx = 4

const Container = styled.div`
  ${interactive}
  position: absolute;
  right: ${horizontalPaddingInPx}px;
  border-radius: 8px;
  padding: 4px 8px;
  ${centerContentCSS};
  font-size: 14px;
  border: 2px solid;
  background: ${getColor('background')};
  color: ${getColor('text')};
  ${defaultTransitionCSS};
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
  const { timelineEndsAt, timelineStartsAt } = useDayOverview()
  const timespan = timelineEndsAt - timelineStartsAt

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
