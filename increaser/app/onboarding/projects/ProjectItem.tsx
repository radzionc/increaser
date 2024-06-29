import { IncludedItem } from '@lib/ui/inputs/IncludedItem'
import { HStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import { useDeleteProjectMutation } from '../../projects/api/userDeleteProjectMutation'
import { couldProjectBeDeleted } from '@increaser/entities-utils/project/couldProjectBeDeleted'
import styled from 'styled-components'
import { Project } from '@increaser/entities/Project'

type ProjectItemProps = {
  value: Project
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
    <Container
      onRemove={
        couldProjectBeDeleted(value.id)
          ? () => deleteProject({ id: value.id })
          : undefined
      }
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
