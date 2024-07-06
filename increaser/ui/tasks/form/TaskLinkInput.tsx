import { TaskLink } from '@increaser/entities/Task'
import { centerContent } from '@lib/ui/css/centerContent'
import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { takeWholeSpace } from '@lib/ui/css/takeWholeSpace'
import {
  textInputBorderRadius,
  textInputHorizontalPadding,
} from '@lib/ui/css/textInput'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { ExternalLinkIcon } from '@lib/ui/icons/ExternalLinkIcon'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { tightListItemMinHeight } from '@lib/ui/list/tightListItemConfig'
import { ExternalLink } from '@lib/ui/navigation/Link/ExternalLink'
import { InputProps } from '@lib/ui/props'
import { getHoverVariant } from '@lib/ui/theme/getHoverVariant'
import { getColor } from '@lib/ui/theme/getters'
import { attempt } from '@lib/utils/attempt'
import { extractRootDomain } from '@lib/utils/url/extractRootDomain'
import { validateUrl } from '@lib/utils/validation/validateUrl'
import styled from 'styled-components'

const Container = styled.div`
  display: grid;
  flex: 1;
  grid-template-columns: auto 1fr 124px;
  gap: 2px;
  ${textInputBorderRadius};
  height: ${toSizeUnit(tightListItemMinHeight)};
  overflow: hidden;

  outline: 1px solid transparent;
  border: 1px solid ${getColor('mist')};

  &:hover {
    outline-color: ${getColor('mist')};
  }

  &:focus-within {
    border-color: ${getColor('mistExtra')};
    border-color: ${getColor('mistExtra')};
  }
`

const LinkPlaceholder = styled.div`
  ${sameDimensions(tightListItemMinHeight)};
  ${centerContent};
  background: ${getColor('foreground')};
  color: ${getColor('textShy')};
`

const Link = styled(ExternalLink)`
  ${sameDimensions(tightListItemMinHeight)};
  ${centerContent};
  background: ${getColor('foreground')};
  color: ${getColor('text')};
  &:hover {
    background: ${getHoverVariant('foreground')};
    color: ${getColor('contrast')};
  }
`

const Input = styled.input`
  ${takeWholeSpace};
  ${horizontalPadding(textInputHorizontalPadding)}
  font-size: 14px;

  outline: none;
  border: none;

  background: ${getColor('foreground')};
  color: ${getColor('text')};

  &::placeholder {
    color: ${getColor('textShy')};
  }
`

const LinkInput = styled(Input)`
  color: ${getColor('textSupporting')};
`

export const TaskLinkInput = ({ value, onChange }: InputProps<TaskLink>) => {
  return (
    <Container>
      {validateUrl(value.url) ? (
        <LinkPlaceholder>
          <IconWrapper>
            <ExternalLinkIcon />
          </IconWrapper>
        </LinkPlaceholder>
      ) : (
        <Link to={value.url}>
          <IconWrapper>
            <ExternalLinkIcon />
          </IconWrapper>
        </Link>
      )}
      <LinkInput
        autoFocus={!value.url}
        style={{ minWidth: 240 }}
        placeholder="https://example.com"
        value={value.url}
        onChange={({ currentTarget: { value: url } }) =>
          onChange({
            ...value,
            url,
            name: value.name || attempt(() => extractRootDomain(url), ''),
          })
        }
      />
      <Input
        style={{ minWidth: 40 }}
        placeholder="name"
        value={value.name}
        onChange={({ currentTarget: { value: name } }) =>
          onChange({ ...value, name })
        }
      />
    </Container>
  )
}
