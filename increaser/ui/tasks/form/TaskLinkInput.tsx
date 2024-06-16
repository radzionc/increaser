import { TaskLink } from '@increaser/entities/Task'
import { takeWholeSpace } from '@lib/ui/css/takeWholeSpace'
import {
  textInputBorderRadius,
  textInputHeight,
  textInputPadding,
} from '@lib/ui/css/textInput'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { InputProps } from '@lib/ui/props'
import { getColor } from '@lib/ui/theme/getters'
import { attempt } from '@lib/utils/attempt'
import { extractRootDomain } from '@lib/utils/url/extractRootDomain'
import styled from 'styled-components'

const Container = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2px;
  ${textInputBorderRadius};
  height: ${toSizeUnit(textInputHeight)};
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

const Input = styled.input`
  ${takeWholeSpace};
  padding: ${toSizeUnit(textInputPadding)};
  font-size: 14px;

  outline: none;
  border: none;

  background: ${getColor('foreground')};
  color: ${getColor('text')};

  &::placeholder {
    color: ${getColor('textShy')};
  }
`

export const TaskLinkInput = ({ value, onChange }: InputProps<TaskLink>) => {
  return (
    <Container>
      <Input
        autoFocus
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
        placeholder="Name"
        value={value.name}
        onChange={({ currentTarget: { value: name } }) =>
          onChange({ ...value, name })
        }
      />
    </Container>
  )
}
