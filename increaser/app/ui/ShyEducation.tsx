import { Text } from '@lib/ui/text'
import { transition } from '@lib/ui/css/transition'
import { ExternalLinkIcon } from '@lib/ui/icons/ExternalLinkIcon'
import styled from 'styled-components'
import { ExternalLink } from '@lib/ui/navigation/Link/ExternalLink'

const Link = styled(ExternalLink)`
  color: ${({ theme }) => theme.colors.textShy.toCssValue()};

  ${transition};

  &:hover {
    color: ${({ theme }) => theme.colors.text.toCssValue()};
  }
`

interface ShyEducationProps {
  content: string
  source: string
}

export const ShyEducation = ({ content, source }: ShyEducationProps) => {
  return (
    <Text size={14} color="supporting">
      {content},{' '}
      <Link to={source}>
        source <ExternalLinkIcon />
      </Link>
    </Text>
  )
}
