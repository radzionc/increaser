import { Form } from '@increaser/ui/ui/Form/Form'
import { SameWidthChildrenRow } from '@increaser/ui/ui/Layout/SameWidthChildrenRow'
import { Button } from '@increaser/ui/ui/buttons/Button'
import { TextInput } from '@increaser/ui/ui/inputs/TextInput'
import { CountryInput } from '@increaser/ui/ui/inputs/CountryInput'
import { Controller, useForm } from 'react-hook-form'
import { useUpdateUserMutation } from 'user/mutations/useUpdateUserMutation'
import { useAssertUserState } from 'user/state/UserStateContext'
import { CountryCode } from '@increaser/ui/ui/inputs/CountryInput/countryNameRecord'

interface PublicProfileFormProps {
  onCancel: () => void
}

interface PublicProfileFormShape {
  name: string
  country: CountryCode | null
}

export const PublicProfileForm = ({ onCancel }: PublicProfileFormProps) => {
  const { name, country } = useAssertUserState()

  const { mutate: updateUser } = useUpdateUserMutation()

  const { register, handleSubmit, control } = useForm<PublicProfileFormShape>({
    defaultValues: {
      name,
      country,
    },
  })

  return (
    <Form
      onSubmit={handleSubmit((fields) => {
        updateUser(fields)
        onCancel()
      })}
      content={
        <>
          <TextInput label="Name" {...register('name', { required: true })} />
          <Controller
            control={control}
            name="country"
            render={({ field: { value, onChange } }) => (
              <CountryInput value={value} onChange={onChange} />
            )}
          />
        </>
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
