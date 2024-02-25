import { EnhancedProject } from '@increaser/ui/projects/EnhancedProject'
import { IncludedItem } from '@lib/ui/inputs/IncludedItem'
import { HStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import styled from 'styled-components'
import { formatDuration } from '@lib/utils/time/formatDuration'
import { useUpdateProjectMutation } from '../../projects/api/useUpdateProjectMutation'
import { round } from '@lib/ui/css/round'

type WeeklyGoalItemProps = {
  value: EnhancedProject
}

const Content = styled.div`
  gap: 8px;
  display: grid;
  grid-template-columns: 8px 68px auto;
  overflow: hidden;
  flex: 1;
  align-items: center;
  gap: 16px;
  font-size: 14px;
`

const Container = styled(IncludedItem)`
  position: relative;
  padding-left: 16px;
`

const Identifier = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  ${round};
`

export const WeeklyGoalItem = ({ value }: WeeklyGoalItemProps) => {
  const { mutate: updateProject } = useUpdateProjectMutation()

  return (
    <Container
      onRemove={() => {
        updateProject({
          id: value.id,
          fields: { allocatedMinutesPerWeek: 0 },
        })
      }}
    >
      <Content>
        <Identifier style={{ background: value.hslaColor.toCssValue() }} />
        <Text weight="bold" color="contrast">
          {formatDuration(value.allocatedMinutesPerWeek, 'min', {
            kind: 'long',
            minUnit: 'h',
            maxUnit: 'h',
          })}
        </Text>
        <HStack alignItems="center" gap={8}>
          <Text color="regular" cropped weight="semibold">
            {value.name}
          </Text>
        </HStack>
      </Content>
    </Container>
  )
}
