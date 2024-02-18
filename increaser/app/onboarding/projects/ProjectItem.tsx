import { EnhancedProject } from '@increaser/ui/projects/EnhancedProject'
import { IncludedItem } from '@lib/ui/inputs/IncludedItem'
import { HStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import { useDeleteProjectMutation } from '../../projects/api/userDeleteProjectMutation'
import styled from 'styled-components'

type ProjectItemProps = {
  value: EnhancedProject
}

const Content = styled(HStack)`
  overflow: hidden;
  flex: 1;
  align-items: center;
  gap: 8px;
`

const Container = styled(IncludedItem)`
  position: relative;
  padding-left: 16px;
`

export const ProjectItem = ({ value }: ProjectItemProps) => {
  const { mutate: deleteProject } = useDeleteProjectMutation()

  return (
    <Container onRemove={() => deleteProject({ id: value.id })}>
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
