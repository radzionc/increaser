import styled from 'styled-components'
import { Text } from '@lib/ui/text'
import { InputContainer } from '@lib/ui/inputs/InputContainer'
import { ElementSizeAware } from '@lib/ui/base/ElementSizeAware'
import { FocusDurationInputContent } from './FocusDurationInputContent'
import { useFocusDuration } from '../state/focusDuration'
import { useUserChangedFocusDurationAt } from '../state/useUserChangedFocusDurationAt'
import { FocusLauncherField } from '../launcher/FocusLauncherField'

const Wrapper = styled(InputContainer)`
  padding: 0;
`

export const FocusDurationInput = () => {
  const [value, setValue] = useFocusDuration()
  const [, setTime] = useUserChangedFocusDurationAt()

  return (
    <FocusLauncherField
      label={
        <span>
          Focus duration:{' '}
          <Text as="span" color="contrast">
            {value} min
          </Text>
        </span>
      }
    >
      <ElementSizeAware
        render={({ size, setElement }) => (
          <Wrapper ref={setElement} style={{ gap: 12 }} as="div">
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
    </FocusLauncherField>
  )
}
