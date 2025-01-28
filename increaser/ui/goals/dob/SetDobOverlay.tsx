import { DayInput } from '@lib/ui/time/day/DayInput'
import { stringToDay, dayToString, Day } from '@lib/utils/time/Day'
import { OnFinishNoValueProp } from '@lib/ui/props'
import { useState } from 'react'
import { useUpdateUserMutation } from '../../user/mutations/useUpdateUserMutation'
import { useUser } from '@increaser/ui/user/state/user'
import { useDobBoundaries } from './useDobBoundaries'
import { getDefaultDob } from './getDefaultDob'
import { Modal } from '@lib/ui/modal'
import { FormActions } from '@lib/ui/form/components/FormActions'
import { ModalContent } from '@lib/ui/modal/ModalContent'

export const SetDobOverlay = ({ onFinish }: OnFinishNoValueProp) => {
  const { dob } = useUser()
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
      <ModalContent>
        <DayInput min={min} max={max} value={value} onChange={setValue} />
      </ModalContent>
    </Modal>
  )
}
