import { Text } from '@lib/ui/text'
import { ExternalLink } from '@increaser/app/router/Link/ExternalLink'
import styled from 'styled-components'
import { ExternalLinkIcon } from '@lib/ui/icons/ExternalLinkIcon'

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
