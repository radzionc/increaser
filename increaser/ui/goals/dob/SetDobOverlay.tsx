import { DayInput } from '@lib/ui/time/day/DayInput'
import { stringToDay, dayToString, Day } from '@lib/utils/time/Day'
import { NoValueFinishProps } from '@lib/ui/props'
import { useState } from 'react'
import { useUpdateUserMutation } from '../../user/mutations/useUpdateUserMutation'
import { useAssertUserState } from '../../user/UserStateContext'
import { useDobBoundaries } from './useDobBoundaries'
import { getDefaultDob } from './getDefaultDob'
import { Modal } from '@lib/ui/modal'
import { FormActions } from '@lib/ui/form/components/FormActions'

export const SetDobOverlay = ({ onFinish }: NoValueFinishProps) => {
  const { dob } = useAssertUserState()
  const { mutate: updateUser } = useUpdateUserMutation()
  const [value, setValue] = useState<Day>(() => {
    if (dob) {
      return stringToDay(dob)
    }

    return getDefaultDob()
  })

  const [min, max] = useDobBoundaries()

  return (
    <Modal
      onClose={onFinish}
      footer={
        <FormActions
          onSubmit={() => {
            updateUser({ dob: dayToString(value) })
            onFinish()
          }}
          onCancel={onFinish}
        />
      }
      title="Your date of birth"
    >
      <DayInput min={min} max={max} value={value} onChange={setValue} />
    </Modal>
  )
}
