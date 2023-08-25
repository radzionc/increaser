import { Controller, UseFormReturn } from 'react-hook-form'
import { Button } from '@increaser/ui/ui/buttons/Button'
import { Form } from '@increaser/ui/ui/Form/Form'
import { ColorLabelInput } from '@increaser/ui/ui/inputs/ColorLabelInput'
import { InputWrapperWithErrorMessage } from '@increaser/ui/ui/inputs/InputWrapper'
import { TextInput } from '@increaser/ui/ui/inputs/TextInput'
import { HStack } from '@increaser/ui/ui/Stack'

import { useHabits } from '../HabitsProvider'
import { HabitFormShape } from './HabitFormShape'
import { EmojiInput } from 'ui/EmojiInput'

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
          <TextInput
            label={'Name'}
            autoFocus
            placeholder="Exercise / Meditate"
            {...register('name')}
            error={errors.name?.message && 'Name is required'}
          />
          <HStack
            style={{ display: 'grid', gridTemplateColumns: 'auto auto' }}
            justifyContent="start"
            alignItems="start"
            gap={20}
          >
            <InputWrapperWithErrorMessage label="Emoji">
              <Controller
                control={control}
                name="emoji"
                render={({ field: { value, onChange } }) => (
                  <EmojiInput value={value} onChange={onChange} />
                )}
              />
            </InputWrapperWithErrorMessage>
            <InputWrapperWithErrorMessage label="Color">
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
            </InputWrapperWithErrorMessage>
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
