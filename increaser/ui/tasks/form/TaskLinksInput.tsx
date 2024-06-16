import { TaskLink } from '@increaser/entities/Task'
import { FieldArrayFrame } from '@lib/ui/form/components/FieldArrayFrame'
import { InputContainer } from '@lib/ui/inputs/InputContainer'
import { LabelText } from '@lib/ui/inputs/LabelText'
import { TextInput } from '@lib/ui/inputs/TextInput'
import { VStack } from '@lib/ui/layout/Stack'
import { InputProps } from '@lib/ui/props'
import { removeAtIndex } from '@lib/utils/array/removeAtIndex'
import { updateAtIndex } from '@lib/utils/array/updateAtIndex'
import { attempt } from '@lib/utils/attempt'
import { extractRootDomain } from '@lib/utils/url/extractRootDomain'

export const TasksLinksInput = ({
  value,
  onChange,
}: InputProps<TaskLink[]>) => {
  return (
    <FieldArrayFrame
      onAppend={() => onChange([...value, { url: '', name: '' }])}
      onRemove={(index) => onChange(removeAtIndex(value, index))}
      fields={value}
      entityName="link"
      renderField={(field, index) => (
        <VStack gap={20}>
          <InputContainer>
            <LabelText>URL</LabelText>
            <TextInput
              style={{ minWidth: 240 }}
              placeholder="https://example.com"
              value={field.url}
              onValueChange={(url) =>
                onChange(
                  updateAtIndex(value, index, (oldValue) => ({
                    ...oldValue,
                    url,
                    name:
                      oldValue.name ||
                      attempt(() => extractRootDomain(url), ''),
                  })),
                )
              }
            />
          </InputContainer>
          <InputContainer>
            <LabelText>Name</LabelText>
            <TextInput
              style={{ minWidth: 40 }}
              placeholder="Example"
              value={field.name}
              onValueChange={(name) =>
                onChange(
                  updateAtIndex(value, index, (oldValue) => ({
                    ...oldValue,
                    name,
                  })),
                )
              }
            />
          </InputContainer>
        </VStack>
      )}
    />
  )
}
