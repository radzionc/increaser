import { useState } from 'react'
import { Form } from '@increaser/ui/ui/Form/Form'
import { TextInput } from '@increaser/ui/ui/inputs/TextInput'
import { useUpdateUserMutation } from 'user/mutations/useUpdateUserMutation'
import { SubmitFormButton } from '@increaser/ui/ui/buttons/SubmitFormButton'

export const NameForm = () => {
  const [name, setName] = useState('')

  const { mutate: updateUser, isLoading } = useUpdateUserMutation()

  return (
    <Form
      onSubmit={() => updateUser({ name })}
      content={
        <TextInput
          autoFocus
          type="text"
          placeholder="John Johnson"
          value={name}
          onValueChange={setName}
        />
      }
      actions={
        <SubmitFormButton
          isDisabled={!name}
          isLoading={isLoading}
          text="Continue"
        />
      }
    />
  )
}
