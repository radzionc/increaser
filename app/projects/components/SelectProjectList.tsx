import { useProjects } from 'projects/hooks/useProjects'
import { HStack, VStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'
import { EmojiTextPrefix } from 'ui/EmojiTextPrefix'
import { LargeSelectOption } from 'ui/LargeSelectOption'

interface Props {
  onSelect: (projectId: string) => void
  value: string
}

export const SelectProjectList = ({ onSelect, value }: Props) => {
  const { activeProjects } = useProjects()

  return (
    <VStack fullWidth gap={8}>
      <VStack fullWidth gap={8}>
        {activeProjects.map((project) => (
          <LargeSelectOption
            value={project.id}
            groupName="project"
            isSelected={project.id === value}
            onSelect={() => onSelect(project.id)}
            key={project.id}
            color={project.hslaColor}
          >
            <HStack alignItems="center" justifyContent="space-between">
              <Text>
                <EmojiTextPrefix emoji={project.emoji} />
                {project.name}
              </Text>
            </HStack>
          </LargeSelectOption>
        ))}
      </VStack>
    </VStack>
  )
}
