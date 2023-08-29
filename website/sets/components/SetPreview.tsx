import { ProjectNameWithEmoji } from 'projects/components/ProjectNameWithEmoji'
import { useProjects } from 'projects/hooks/useProjects'
import { getProjectColor } from 'projects/utils/getProjectColor'
import { getSetDuration } from 'sets/helpers/getSetDuration'
import { formatDuration } from '@increaser/utils/time/formatDuration'
import styled, { useTheme } from 'styled-components'
import { HSLA } from '@increaser/ui/ui/colors/HSLA'
import { HStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'

const Container = styled(HStack)<{ $color: HSLA }>`
  border-radius: 8px;
  padding: 8px;
  border: 2px solid ${({ $color }) => $color.toCssValue()};
`

interface Props {
  start: number
  end: number
  projectId?: string
}

export const SetPreview = ({ start, end, projectId }: Props) => {
  const { projectsRecord } = useProjects()

  const theme = useTheme()

  const project = projectId ? projectsRecord[projectId] : null

  return (
    <Container
      $color={getProjectColor(projectsRecord, theme, projectId)}
      alignItems="center"
      fullWidth
      justifyContent="space-between"
      gap={8}
    >
      <ProjectNameWithEmoji
        color="supporting"
        project={project || { name: '', emoji: '🤷‍♂️' }}
      />
      <Text nowrap weight="semibold">
        {formatDuration(getSetDuration({ start, end }), 'ms')}
      </Text>
    </Container>
  )
}
