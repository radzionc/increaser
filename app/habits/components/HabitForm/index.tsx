import { Controller, UseFormReturn } from 'react-hook-form'
import { Button } from '@increaser/ui/buttons/Button'
import { Form } from '@increaser/ui/form/components/Form'
import { ColorLabelInput } from '@increaser/ui/inputs/ColorLabelInput'
import { TextInput } from '@increaser/ui/inputs/TextInput'
import { HStack } from '@increaser/ui/layout/Stack'

import { useHabits } from '../HabitsProvider'
import { HabitFormShape } from './HabitFormShape'
import { EmojiInput } from 'ui/EmojiInput'
import { InputContainer } from '@increaser/ui/inputs/InputContainer'
import { LabelText } from '@increaser/ui/inputs/LabelText'

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
