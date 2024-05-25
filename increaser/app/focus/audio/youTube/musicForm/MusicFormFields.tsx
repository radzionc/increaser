import { InputProps } from '@lib/ui/props'
import { TextInput } from '@lib/ui/inputs/TextInput'
import { Field } from '@lib/ui/inputs/Field'
import { Fields } from '@lib/ui/inputs/Fields'
import { MusicFormShape } from './MusicFormShape'

export const MusicFormFields = ({
  value,
  onChange,
}: InputProps<MusicFormShape>) => {
  return (
    <Fields>
      <Field>
        <TextInput
          label="Focus music name"
          autoFocus
          placeholder="My focus music"
          value={value.name}
          onValueChange={(name) => onChange({ ...value, name })}
        />
      </Field>
      <Field>
        <TextInput
          label="YouTube video URL"
          placeholder="https://youtu.be/..."
          value={value.url}
          onValueChange={(url) => onChange({ ...value, url })}
        />
      </Field>
    </Fields>
  )
}
