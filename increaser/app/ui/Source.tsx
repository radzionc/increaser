import { Text } from '@lib/ui/text'
import styled from 'styled-components'
import { ExternalLinkIcon } from '@lib/ui/icons/ExternalLinkIcon'
import { ExternalLink } from '@lib/ui/navigation/Link/ExternalLink'

interface SourceProps {
  text: string
  url: string
}

const IconWr = styled.span`
  margin-left: 4px;
`

export const Source = ({ text, url }: SourceProps) => {
  return (
    <ExternalLink to={url}>
      <Text color="primary" as="span">
        {text}
        <IconWr>
          <ExternalLinkIcon />
        </IconWr>
      </Text>
    </ExternalLink>
  )
}
