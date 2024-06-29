import { HStack, VStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import { EmojiTextPrefix } from '@lib/ui/text/EmojiTextPrefix'
import { LargeSelectOption } from '@increaser/app/ui/LargeSelectOption'
import { useActiveProjects } from '@increaser/ui/projects/hooks/useActiveProjects'
import { useTheme } from 'styled-components'

interface Props {
  onSelect: (projectId: string) => void
  value: string
}

export const SelectProjectList = ({ onSelect, value }: Props) => {
  const activeProjects = useActiveProjects()
  const { colors } = useTheme()

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
            color={colors.getLabelColor(project.color)}
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
