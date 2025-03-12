import { Field } from '@lib/ui/inputs/Field'
import { Fields } from '@lib/ui/inputs/Fields'
import { TextInput } from '@lib/ui/inputs/TextInput'
import { InputProps } from '@lib/ui/props'
import { attempt } from '@lib/utils/attempt'
import { capitalizeFirstLetter } from '@lib/utils/capitalizeFirstLetter'
import { extractRootDomain } from '@lib/utils/url/extractRootDomain'
import { TaskLink } from '@product/entities/Task'

export const TaskLinkFormFields = ({
  value,
  onChange,
}: InputProps<TaskLink>) => {
  return (
    <Fields>
      <Field>
        <TextInput
          autoFocus
          label="URL"
          placeholder="https://..."
          value={value.url}
          onValueChange={(url) =>
            onChange({
              ...value,
              url,
              name:
                value.name ||
                attempt(
                  () => capitalizeFirstLetter(extractRootDomain(url)),
                  '',
                ),
            })
          }
        />
      </Field>
      <Field>
        <TextInput
          label="Title"
          value={value.name}
          onValueChange={(name) => onChange({ ...value, name })}
        />
      </Field>
    </Fields>
  )
}
