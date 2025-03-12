import { FormActions } from '@lib/ui/form/components/FormActions'
import { Modal } from '@lib/ui/modal'
import { ModalContent } from '@lib/ui/modal/ModalContent'
import { OnFinishProp } from '@lib/ui/props'
import { DayInput } from '@lib/ui/time/day/DayInput'
import { stringToDay, dayToString, Day } from '@lib/utils/time/Day'
import { useUser } from '@product/ui/user/state/user'
import { useState } from 'react'

import { useUpdateUserMutation } from '../../user/mutations/useUpdateUserMutation'

import { getDefaultDob } from './getDefaultDob'
import { useDobBoundaries } from './useDobBoundaries'

export const SetDobOverlay = ({ onFinish }: OnFinishProp) => {
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
