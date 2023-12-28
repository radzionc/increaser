import { useProjects } from '@increaser/app/projects/hooks/useProjects'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import { EmojiTextPrefix } from '@increaser/app/ui/EmojiTextPrefix'
import { LargeSelectOption } from '@increaser/app/ui/LargeSelectOption'

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
