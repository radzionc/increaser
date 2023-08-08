import { Form } from '@increaser/ui/ui/Form/Form'
import { SameWidthChildrenRow } from '@increaser/ui/ui/Layout/SameWidthChildrenRow'
import { Button } from '@increaser/ui/ui/buttons/Button'
import { TextInput } from '@increaser/ui/ui/inputs/TextInput'
import { useForm } from 'react-hook-form'
import { useUpdateUserMutation } from 'user/mutations/useUpdateUserMutation'
import { useAssertUserState } from 'user/state/UserStateContext'

interface PublicProfileFormProps {
  onCancel: () => void
}

export const PublicProfileForm = ({ onCancel }: PublicProfileFormProps) => {
  const { name } = useAssertUserState()

  const { mutate: updateUser } = useUpdateUserMutation()

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name,
    },
  })

  return (
    <Form
      onSubmit={handleSubmit((fields) => updateUser(fields))}
      content={
        <TextInput label="Name" {...register('name', { required: true })} />
      }
      actions={
        <SameWidthChildrenRow gap={8}>
          <Button type="button" kind="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button kind="reversed">Update</Button>
        </SameWidthChildrenRow>
      }
    />
  )
}
