import { HStack, VStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import { LargeSelectOption } from './LargeSelectOption'
import { useActiveProjects } from './hooks/useActiveProjects'
import { useTheme } from 'styled-components'

interface Props {
  onSelect: (projectId: string) => void
  value: string
}

export const SelectProjectList = ({ onSelect, value }: Props) => {
  const activeProjects = useActiveProjects()
  const theme = useTheme()

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
            color={theme.colors.getLabelColor(project.color)}
          >
            <HStack alignItems="center" justifyContent="space-between">
              <Text>
                <Text color="contrast" style={{ marginRight: 8 }} as="span">
                  {project.emoji}
                </Text>
                {project.name}
              </Text>
            </HStack>
          </LargeSelectOption>
        ))}
      </VStack>
    </VStack>
  )
}
