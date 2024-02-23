import { EnhancedProject } from '@increaser/ui/projects/EnhancedProject'
import { IncludedItem } from '@lib/ui/inputs/IncludedItem'
import { HStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import { useDeleteProjectMutation } from '../../projects/api/userDeleteProjectMutation'
import styled from 'styled-components'
import { formatDuration } from '@lib/utils/time/formatDuration'

type WeeklyGoalItemProps = {
  value: EnhancedProject
}

const Content = styled(HStack)`
  overflow: hidden;
  flex: 1;
  align-items: center;
  gap: 16px;
`

const Container = styled(IncludedItem)`
  position: relative;
  padding-left: 16px;
`

export const WeeklyGoalItem = ({ value }: WeeklyGoalItemProps) => {
  const { mutate: deleteProject } = useDeleteProjectMutation()

  return (
    <Container onRemove={() => deleteProject({ id: value.id })}>
      <Content>
        <Text weight="bold" color="contrast">
          {formatDuration(value.allocatedMinutesPerWeek, 'min')}
        </Text>
        <HStack alignItems="center" gap={8}>
          <Text color="contrast" size={18}>
            {value.emoji}
          </Text>
          <Text color="regular" cropped weight="semibold">
            {value.name}
          </Text>
        </HStack>
      </Content>
    </Container>
  )
}
