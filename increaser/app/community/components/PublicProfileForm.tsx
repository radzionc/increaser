import { Form } from '@lib/ui/form/components/Form'
import { UniformColumnGrid } from '@lib/ui/Layout/UniformColumnGrid'
import { Button } from '@lib/ui/buttons/Button'
import { TextInput } from '@lib/ui/inputs/TextInput'
import { Controller, useForm } from 'react-hook-form'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { CountryCode } from '@lib/countries'
import { CountryInput } from '@lib/ui/inputs/CountryInput'
import { useUpdateUserMutation } from '@increaser/ui/user/mutations/useUpdateUserMutation'

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
        <UniformColumnGrid gap={8}>
          <Button size="l" type="button" kind="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button size="l" kind="reversed">
            Update
          </Button>
        </UniformColumnGrid>
      }
    />
  )
}
