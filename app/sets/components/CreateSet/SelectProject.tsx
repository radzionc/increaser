import { useProjects } from 'projects/hooks/useProjects'
import styled from 'styled-components'
import { defaultTransitionCSS } from '@increaser/ui/ui/animations/transitions'
import { HSLA } from '@increaser/ui/ui/colors/HSLA'
import { ChevronRightIcon } from '@increaser/ui/icons/ChevronRightIcon'
import { Panel } from '@increaser/ui/ui/Panel/Panel'
import { HStack, VStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'
import { centerContentCSS } from '@increaser/ui/ui/utils/centerContentCSS'
import { getSameDimensionsCSS } from '@increaser/ui/ui/utils/getSameDimensionsCSS'

interface Props {
  onSelect: (projectId: string) => void
}

const IconWr = styled.div`
  display: flex;
  font-size: 24px;
  color: ${({ theme }) => theme.colors.textSupporting.toCssValue()};
  ${defaultTransitionCSS};

  ${getSameDimensionsCSS(40)};
  ${centerContentCSS};
  border-radius: 1000px;
`

const Container = styled(Panel)<{ $color: HSLA }>`
  cursor: pointer;
  :hover ${IconWr} {
    background: ${({ theme }) => theme.colors.mist.toCssValue()};
    color: ${({ $color }) => $color.toCssValue()};
  }
`

export const SelectProject = ({ onSelect }: Props) => {
  const { activeProjects } = useProjects()

  return (
    <VStack fullWidth gap={8}>
      <Text color="supporting">Select project</Text>
      {activeProjects.map((project) => (
        <Container
          $color={project.hslaColor}
          key={project.id}
          onClick={() => onSelect(project.id)}
        >
          <HStack alignItems="center" justifyContent="space-between">
            <HStack alignItems="center" gap={12}>
              <Text size={24}>{project.emoji}</Text>
              <Text weight="bold">{project.name}</Text>
            </HStack>
            <IconWr>
              <ChevronRightIcon />
            </IconWr>
          </HStack>
        </Container>
      ))}
    </VStack>
  )
}
