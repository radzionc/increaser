import {
  FixedOptionsInput,
  FixedOptionsInputWrapperProps,
} from '@lib/ui/inputs/dropdown/FixedOptionsInput'
import { EnhancedProject } from '../EnhancedProject'
import { IdentifierPlaceholder } from '@lib/ui/inputs/dropdown/FixedOptionsInput/IdentifierPlaceholder'
import { ProjectOption } from './ProjectOption'
import { ProjectIdentifier } from './ProjectIdentifier'

type ProjectInputProps = FixedOptionsInputWrapperProps<EnhancedProject>

export function ProjectInput({
  value,
  onChange,
  label,
  options,
  ...rest
}: ProjectInputProps) {
  return (
    <FixedOptionsInput
      value={value}
      label={label}
      onChange={onChange}
      placeholder="Search for a project"
      options={options}
      getOptionSearchStrings={(option) => [option.name]}
      getOptionName={(option) => option.name}
      getOptionKey={(option) => option.id}
      renderOptionIdentifier={(project) => (
        <ProjectIdentifier>{project.emoji}</ProjectIdentifier>
      )}
      optionIdentifierPlaceholder={<IdentifierPlaceholder />}
      renderOption={(project) => <ProjectOption value={project} />}
      {...rest}
    />
  )
}
