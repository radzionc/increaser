import styled from 'styled-components'
import { Text } from '@lib/ui/text'
import { FocusDuration } from '@increaser/entities/FocusDuration'
import { InputContainer } from '@lib/ui/inputs/InputContainer'
import { LabelText } from '@lib/ui/inputs/LabelText'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { panelDefaultPadding } from '@lib/ui/panel/Panel'
import { ElementSizeAware } from '@lib/ui/base/ElementSizeAware'
import { FocusDurationInputContent } from './FocusDurationInputContent'
import { InputProps } from '@lib/ui/props'

const Wrapper = styled(InputContainer)`
  padding: 0;
`

const Label = styled(LabelText)`
  padding: ${toSizeUnit(panelDefaultPadding)};

  padding-bottom: 0;
`

export const FocusDurationInput = ({
  value,
  onChange,
}: InputProps<FocusDuration>) => {
  return (
    <ElementSizeAware
      render={({ size, setElement }) => (
        <Wrapper ref={setElement} style={{ gap: 12 }} as="div">
          <Label>
            Focus duration:{' '}
            <Text as="span" color="contrast" weight="semibold">
              {value} min
            </Text>
          </Label>
          {size && (
            <FocusDurationInputContent
              value={value}
              onChange={onChange}
              width={size.width}
            />
          )}
        </Wrapper>
      )}
    />
  )
}
