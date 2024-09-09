import { TaskLink } from '@increaser/entities/Task'
import { CreateFormFooter } from '@lib/ui/form/components/CreateFormFooter'
import { getFormProps } from '@lib/ui/form/utils/getFormProps'
import { validate } from '@lib/ui/form/utils/validate'
import { Field } from '@lib/ui/inputs/Field'
import { Fields } from '@lib/ui/inputs/Fields'
import { TextInput } from '@lib/ui/inputs/TextInput'
import { Modal } from '@lib/ui/modal'
import { OptionalValueFinishProps } from '@lib/ui/props'
import { attempt } from '@lib/utils/attempt'
import { capitalizeFirstLetter } from '@lib/utils/capitalizeFirstLetter'
import { extractRootDomain } from '@lib/utils/url/extractRootDomain'
import { validateUrl } from '@lib/utils/validation/validateUrl'
import { useMemo, useState } from 'react'

export const AddTaskOverlay = ({
  onFinish,
}: OptionalValueFinishProps<TaskLink>) => {
  const [value, setValue] = useState<TaskLink>({
    url: '',
    name: '',
  })

  const isDisabled = useMemo(() => {
    const errors = validate(value, {
      url: validateUrl,
      name: (name) => {
        if (!name) {
          return 'Please enter a title'
        }
      },
    })

    return Object.values(errors)[0]
  }, [value])

  return (
    <Modal
      title="Add a link to your task"
      targetWidth={480}
      onClose={() => onFinish()}
      as="form"
      {...getFormProps({
        onClose: () => onFinish(),
        isDisabled,
        onSubmit: () => onFinish(value),
      })}
      footer={
        <CreateFormFooter isDisabled={isDisabled} onCancel={() => onFinish()} />
      }
    >
      <Fields>
        <Field>
          <TextInput
            autoFocus
            label="URL"
            placeholder="https://..."
            value={value.url}
            onValueChange={(url) =>
              setValue({
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
            onValueChange={(name) => setValue({ ...value, name })}
          />
        </Field>
      </Fields>
    </Modal>
  )
}
