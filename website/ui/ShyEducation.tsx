import { Text } from '@increaser/ui/text'
import { transition } from '@increaser/ui/css/transition'
import { ExternalLinkIcon } from '@increaser/ui/icons/ExternalLinkIcon'
import { ExternalLink } from 'router/Link/ExternalLink'
import styled from 'styled-components'

const Link = styled(ExternalLink)`
  color: ${({ theme }) => theme.colors.textShy.toCssValue()};

  ${transition};

  :hover {
    color: ${({ theme }) => theme.colors.text.toCssValue()};
  }
`

interface ShyEducationProps {
  content: string
  source?: string
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
