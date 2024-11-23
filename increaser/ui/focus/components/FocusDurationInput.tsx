import styled from 'styled-components'
import { Text } from '@lib/ui/text'
import { InputContainer } from '@lib/ui/inputs/InputContainer'
import { InputLabel } from '@lib/ui/inputs/InputLabel'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { panelDefaultPadding } from '@lib/ui/css/panel'
import { ElementSizeAware } from '@lib/ui/base/ElementSizeAware'
import { FocusDurationInputContent } from './FocusDurationInputContent'
import { useFocusDuration } from '../state/focusDuration'
import { useUserChangedFocusDurationAt } from '../state/useUserChangedFocusDurationAt'

const Wrapper = styled(InputContainer)`
  padding: 0;
`

const Label = styled(InputLabel)`
  padding: ${toSizeUnit(panelDefaultPadding)};

  padding-bottom: 0;
`

export const FocusDurationInput = () => {
  const [value, setValue] = useFocusDuration()
  const [, setTime] = useUserChangedFocusDurationAt()

  return (
    <ElementSizeAware
      render={({ size, setElement }) => (
        <Wrapper ref={setElement} style={{ gap: 12 }} as="div">
          <Label>
            Focus duration:{' '}
            <Text as="span" color="contrast" weight="500">
              {value} min
            </Text>
          </Label>
          {size && (
            <FocusDurationInputContent
              value={value}
              onChange={(newValue) => {
                setTime(Date.now())
                setValue(newValue)
              }}
              width={size.width}
            />
          )}
        </Wrapper>
      )}
    />
  )
}
