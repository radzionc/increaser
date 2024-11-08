import { ComponentWithValueProps } from '@lib/ui/props'
import { useTrackedProjects } from './projects/TrackedProjectsProvider'
import { SigmaIcon } from '@lib/ui/icons/SigmaIcon'
import styled from 'styled-components'
import { Text, text } from '@lib/ui/text'

const Container = styled.p`
  ${text({
    centerVertically: true,
  })}
  gap: 8px;
  text-align: start;

  > * {
    &:first-child {
      font-size: 18px;
    }
  }
`

export const TrackedEntityIndicator = ({
  value,
}: ComponentWithValueProps<string | null>) => {
  const projects = useTrackedProjects()

  if (!value) {
    return (
      <Container>
        <SigmaIcon />
        All projects
      </Container>
    )
  }

  const { emoji, name } = projects[value]

  return (
    <Container>
      <Text as="span" color="contrast">
        {emoji}
      </Text>
      {name}
    </Container>
  )
}
