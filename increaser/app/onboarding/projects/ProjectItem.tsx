import { EnhancedProject } from '@increaser/ui/projects/EnhancedProject'
import { IncludedItem } from '@lib/ui/inputs/IncludedItem'
import { HStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import { useDeleteProjectMutation } from '../../projects/api/userDeleteProjectMutation'
import styled from 'styled-components'
import { HSLA } from '@lib/ui/colors/HSLA'

type ProjectItemProps = {
  value: EnhancedProject
}

const Content = styled(HStack)`
  overflow: hidden;
  flex: 1;
  align-items: center;
  gap: 8px;
`

const Container = styled(IncludedItem)<{ $color: HSLA }>`
  border: 1px solid ${({ $color }) => $color.toCssValue()};
  box-shadow: 0 0 4px 1px
    ${({ $color }) => $color.getVariant({ a: () => 0.8 }).toCssValue()};
`

export const ProjectItem = ({ value }: ProjectItemProps) => {
  const { mutate: deleteProject } = useDeleteProjectMutation()

  return (
    <Container
      $color={value.hslaColor}
      onRemove={() => deleteProject({ id: value.id })}
    >
      <Content>
        <Text color="contrast" size={18}>
          {value.emoji}
        </Text>
        <Text color="contrast" cropped weight="semibold">
          {value.name}
        </Text>
      </Content>
    </Container>
  )
}
