import { Form } from '@increaser/ui/form/components/Form'
import { SameWidthChildrenRow } from '@increaser/ui/Layout/SameWidthChildrenRow'
import { Button } from '@increaser/ui/buttons/Button'
import { TextInput } from '@increaser/ui/inputs/TextInput'
import { Controller, useForm } from 'react-hook-form'
import { useAssertUserState } from 'user/state/UserStateContext'
import { CountryCode } from '@increaser/utils/countries'
import { CountryInput } from '@increaser/ui/inputs/CountryInput'
import { useUpdateUserMutation } from 'user/mutations/useUpdateUserMutation'

interface PublicProfileFormProps {
  onCancel: () => void
}

interface PublicProfileFormShape {
  name: string | null
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
        const newFields = {
          name: fields.name ?? undefined,
          country: fields.country ?? undefined,
        }
        updateUser(newFields)
        onCancel()
      })}
      content={
        <>
          <TextInput label="Name" {...register('name', { required: true })} />
          <Controller
            control={control}
            name="country"
            render={({ field: { value, onChange } }) => (
              <CountryInput
                label="Your country"
                value={value}
                onChange={onChange}
              />
            )}
          />
        </>
      }
      actions={
        <SameWidthChildrenRow gap={8}>
          <Button size="l" type="button" kind="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button size="l" kind="reversed">
            Update
          </Button>
        </SameWidthChildrenRow>
      }
    />
  )
}
