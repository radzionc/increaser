import { Text } from '@increaser/ui/ui/Text'
import { ExternalLink } from 'router/Link/ExternalLink'
import styled from 'styled-components'
import { ExternalLinkIcon } from '@increaser/ui/ui/icons/ExternalLinkIcon'

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
