import { TaskLink } from '@increaser/entities/Task'
import { textInput } from '@lib/ui/css/textInput'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import {
  tightListItemConfig,
  tightListItemMinHeight,
} from '@lib/ui/list/tightListItemConfig'
import { InputProps } from '@lib/ui/props'
import { getColor } from '@lib/ui/theme/getters'
import { attempt } from '@lib/utils/attempt'
import { extractRootDomain } from '@lib/utils/url/extractRootDomain'
import styled from 'styled-components'

const Container = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: ${toSizeUnit(tightListItemConfig.gap)};
  overflow: hidden;
  height: ${toSizeUnit(tightListItemMinHeight)};
  font-size: 14px;
`

const LinkInput = styled.input`
  height: 100%;
  outline: none;
  border: none;

  background: transparent;
  color: ${getColor('textSupporting')};

  &::placeholder {
    color: ${getColor('textShy')};
  }
`

const NameInput = styled.input`
  ${textInput};
  height: 100%;
`

export const TaskLinkInput = ({ value, onChange }: InputProps<TaskLink>) => {
  return (
    <Container>
      <LinkInput
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
      <NameInput
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
