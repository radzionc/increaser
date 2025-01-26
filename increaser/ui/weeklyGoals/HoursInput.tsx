import { TextButton } from '@lib/ui/buttons/TextButton'
import { centerContent } from '@lib/ui/css/centerContent'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { textInput, textInputHorizontalPadding } from '@lib/ui/css/textInput'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { ClockIcon } from '@lib/ui/icons/ClockIcon'
import { InputContainer } from '@lib/ui/inputs/InputContainer'
import { InputLabel } from '@lib/ui/inputs/InputLabel'
import { FixedOptionsInputIdentifierWrapper } from '@lib/ui/inputs/dropdown/FixedOptionsInput/IdentifierWrapper'
import { dropdownInputConfig } from '@lib/ui/inputs/dropdown/config'
import { RelativeRow } from '@lib/ui/layout/RelativeRow'
import { HStack } from '@lib/ui/css/stack'
import { InputProps } from '@lib/ui/props'
import { getColor } from '@lib/ui/theme/getters'
import { formatDuration } from '@lib/utils/time/formatDuration'
import { ReactNode, useState } from 'react'
import styled from 'styled-components'

type HoursInputProps = InputProps<number | null> & {
  label?: ReactNode
  placeholder?: string
  max?: number
  onBlur?: () => void
} & Omit<React.ComponentProps<typeof Input>, 'value' | 'onChange'>

const IconWrapper = styled(FixedOptionsInputIdentifierWrapper)`
  ${centerContent};
  ${sameDimensions('1em')};
  color: ${getColor('text')};
  svg {
    font-size: 18px;
  }
`

const Input = styled.input`
  ${textInput};
  padding-left: ${toSizeUnit(
    dropdownInputConfig.identifierSize + textInputHorizontalPadding * 2,
  )};
`

export const HoursInput = ({
  label = 'Amount',
  placeholder = 'Enter an amount',
  max,
  value,
  onChange,
  onBlur,
  ...rest
}: HoursInputProps) => {
  const valueAsString = value?.toString() ?? ''
  const [inputValue, setInputValue] = useState<string>(valueAsString)

  return (
    <InputContainer onBlur={onBlur}>
      <HStack
        alignItems="center"
        justifyContent="space-between"
        gap={16}
        fullWidth
      >
        <InputLabel>{label}</InputLabel>
        {max !== undefined && (
          <TextButton
            as="div"
            style={{ fontSize: 14 }}
            onClick={() => onChange(max)}
          >
            Max:{' '}
            {formatDuration(max, 'h', {
              maxUnit: 'h',
              minUnit: 'h',
              kind: 'l',
            })}
          </TextButton>
        )}
      </HStack>
      <RelativeRow>
        <IconWrapper>
          <ClockIcon />
        </IconWrapper>
        <Input
          type="number"
          onWheel={(event) => {
            event.currentTarget?.blur()
          }}
          placeholder={placeholder}
          value={
            Number(valueAsString) === Number(inputValue)
              ? inputValue
              : valueAsString
          }
          onChange={(event) => {
            const newInputValue = event.currentTarget.value
              .replace(/^0+/, '')
              .replace(/[^0-9]/g, '')

            if (newInputValue === '') {
              setInputValue('')
              onChange(null)
              return
            }

            const valueAsNumber = parseInt(newInputValue)
            if (isNaN(valueAsNumber)) {
              return
            }

            if (max !== undefined && valueAsNumber > max) {
              return
            }

            setInputValue(valueAsNumber.toString())
            onChange(valueAsNumber)
          }}
          {...rest}
        />
      </RelativeRow>
    </InputContainer>
  )
}
