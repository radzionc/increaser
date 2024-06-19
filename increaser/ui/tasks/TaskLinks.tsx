import { HStack } from '@lib/ui/layout/Stack'
import { ExternalLink } from '@lib/ui/navigation/Link/ExternalLink'
import styled from 'styled-components'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { getColor } from '@lib/ui/theme/getters'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { ExternalLinkIcon } from '@lib/ui/icons/ExternalLinkIcon'
import { ComponentWithValueProps } from '@lib/ui/props'
import { TaskLink } from '@increaser/entities/Task'

const Container = styled(ExternalLink)`
  padding: 4px 8px;
  ${borderRadius.s};
  font-size: 14px;
  border: 1px solid ${getColor('mist')};
  font-weight: 500;
  background: ${getColor('foreground')};

  &:hover {
    border-color: ${getColor('mistExtra')};
    svg {
      color: ${getColor('contrast')};
    }
  }
  svg {
    color: ${({ theme }) =>
      theme.colors.foreground.getVariant({ l: () => 32 }).toCssValue()};
  }
`

export const TaskLinks = ({ value }: ComponentWithValueProps<TaskLink[]>) => {
  return (
    <HStack wrap="wrap" gap={8}>
      {value.map(({ url, name }, index) => (
        <Container key={index} to={url}>
          <HStack alignItems="center" gap={8}>
            {name}
            <IconWrapper>
              <ExternalLinkIcon />
            </IconWrapper>
          </HStack>
        </Container>
      ))}
    </HStack>
  )
}
