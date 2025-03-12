import { InputContainer } from '@lib/ui/inputs/InputContainer'
import { InputLabel } from '@lib/ui/inputs/InputLabel'
import { RadioInput } from '@lib/ui/inputs/RadioInput'
import { InputProps } from '@lib/ui/props'
import {
  ProjectWorkingDays,
  projectWorkingDays,
  workingDayOptionName,
} from '@product/entities/Project'

export const WorkdingDaysInput = ({
  value,
  onChange,
}: InputProps<ProjectWorkingDays>) => {
  return (
    <InputContainer>
      <InputLabel>Working days</InputLabel>
      <RadioInput
        options={projectWorkingDays}
        renderOption={(option) => workingDayOptionName[option]}
        value={value}
        onChange={onChange}
      />
    </InputContainer>
  )
}
