import {
  ProjectWorkingDays,
  projectWorkingDays,
  workingDayOptionName,
} from '@increaser/entities/Project'
import { RadioInput } from '@lib/ui/inputs/RadioInput'
import { InputContainer } from '@lib/ui/inputs/InputContainer'
import { InputLabel } from '@lib/ui/inputs/InputLabel'
import { InputProps } from '@lib/ui/props'

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
