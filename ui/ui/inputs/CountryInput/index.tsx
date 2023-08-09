import { InputProps } from '../../../shared/props'
import { FixedOptionsInput } from '../Combobox/FixedOptionsInput'
import { CountryCode, countryNameRecord } from './countryNameRecord'

interface CountryInputProps extends InputProps<CountryCode | null> {}

export const CountryInput = ({ value, onChange }: CountryInputProps) => {
  return (
    <FixedOptionsInput
      label="Country"
      value={value}
      options={Object.keys(countryNameRecord) as CountryCode[]}
      optionToString={(option) => countryNameRecord[option]}
      onChange={onChange}
      placeholder="Select country"
    />
  )
}
