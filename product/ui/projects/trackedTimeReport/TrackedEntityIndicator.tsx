import { SigmaIcon } from '@lib/ui/icons/SigmaIcon'
import { ValueProp } from '@lib/ui/props'
import { Text, text } from '@lib/ui/text'
import styled from 'styled-components'

import { useTrackedProjects } from './projects/TrackedProjectsProvider'

const Container = styled.p`
  ${text({
    centerVertically: true,
  })}
  gap: 8px;
  text-align: start;

  > * {
    &:first-child {
      font-size: 18px;
      line-height: 1;
    }
  }
`

export const TrackedEntityIndicator = ({ value }: ValueProp<string | null>) => {
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
