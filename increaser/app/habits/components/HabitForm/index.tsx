import { Controller, UseFormReturn } from 'react-hook-form'
import { Button } from '@lib/ui/buttons/Button'
import { Form } from '@lib/ui/form/components/Form'
import { ColorLabelInput } from '@lib/ui/inputs/ColorLabelInput'
import { TextInput } from '@lib/ui/inputs/TextInput'
import { HStack } from '@lib/ui/layout/Stack'

import { useHabits } from '../HabitsProvider'
import { HabitFormShape } from './HabitFormShape'
import { EmojiInput } from '@increaser/app/ui/EmojiInput'
import { InputContainer } from '@lib/ui/inputs/InputContainer'
import { LabelText } from '@lib/ui/inputs/LabelText'
import { Field } from '@lib/ui/inputs/Field'

interface Props {
  form: UseFormReturn<HabitFormShape>
  onSubmit: (result: HabitFormShape) => void
  isLoading: boolean
  submitText?: string
}

export const HabitForm = ({
  form: {
    register,
    handleSubmit,
    control,
    formState: { errors },
  },
  onSubmit,
  isLoading,
  submitText = 'Create',
}: Props) => {
  const { habits } = useHabits()
  const usedColors = new Set((habits || []).map(({ color }) => color))

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      content={
        <>
          <Field error={errors.name?.message && 'Name is required'}>
            <TextInput
              label={'Name'}
              autoFocus
              placeholder="Exercise / Meditate"
              {...register('name')}
            />
          </Field>
          <HStack
            style={{ display: 'grid', gridTemplateColumns: 'auto auto' }}
            justifyContent="start"
            alignItems="start"
            gap={20}
          >
            <InputContainer>
              <LabelText>Emoji</LabelText>
              <Controller
                control={control}
                name="emoji"
                render={({ field: { value, onChange } }) => (
                  <EmojiInput value={value} onChange={onChange} />
                )}
              />
            </InputContainer>
            <InputContainer>
              <LabelText>Color</LabelText>
              <Controller
                control={control}
                name="color"
                render={({ field: { value, onChange } }) => (
                  <ColorLabelInput
                    usedValues={usedColors}
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
            </InputContainer>
          </HStack>
        </>
      }
      actions={
        <Button kind="outlined" size="l" isLoading={isLoading}>
          {submitText}
        </Button>
      }
    />
  )
}
