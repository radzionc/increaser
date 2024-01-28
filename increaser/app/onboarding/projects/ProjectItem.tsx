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

export const ProjectItem = ({ value }: ProjectItemProps) => {
  const { mutate: deleteProject } = useDeleteProjectMutation()

  return (
    <IncludedItem onRemove={() => deleteProject({ id: value.id })}>
      <Content>
        <Text color="contrast" size={18}>
          {value.emoji}
        </Text>
        <Text cropped weight="semibold">
          {value.name}
        </Text>
      </Content>
    </IncludedItem>
  )
}
