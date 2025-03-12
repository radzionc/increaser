import { EditFormFooter } from '@lib/ui/form/components/EditFormFooter'
import { getFormProps } from '@lib/ui/form/utils/getFormProps'
import { useKeyDown } from '@lib/ui/hooks/useKeyDown'
import { Modal } from '@lib/ui/modal'
import { ModalContent } from '@lib/ui/modal/ModalContent'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { omit } from '@lib/utils/record/omit'
import { useLastSet } from '@product/app/sets/hooks/useLastSet'
import { useCallback } from 'react'

import { useUpdateSetMutation } from '../../sets/api/useUpdateSetMutation'

import { AutoStoppedSetEndTimeInput } from './AutoStoppedSetEndTimeInput'
import { AutoStoppedSetIntervalProvider } from './AutoStoppedSetIntervalProvider'
import { useSetEndTime } from './state/setEndTime'

export const LastSetAutoStopOverlay = () => {
  const lastSet = shouldBePresent(useLastSet())

  const { mutate: updateSet } = useUpdateSetMutation()

  const handleCancel = useCallback(() => {
    updateSet({
      old: lastSet,
      new: omit(lastSet, 'isEndEstimated'),
    })
  }, [lastSet, updateSet])

  const [end] = useSetEndTime()

  const handleSubmit = useCallback(() => {
    updateSet({
      old: lastSet,
      new: {
        ...omit(lastSet, 'isEndEstimated'),
        end,
      },
    })
  }, [end, lastSet, updateSet])

  useKeyDown('Enter', handleSubmit)

  return (
    <Modal
      placement="top"
      width={400}
      title="Adjust last session end time"
      subTitle="Your last session was automatically stopped. Update the end time to reflect when you finished working."
      onClose={handleSubmit}
      footer={<EditFormFooter submitText="Submit" onCancel={handleCancel} />}
      as="form"
      {...getFormProps({
        onSubmit: handleSubmit,
      })}
    >
      <ModalContent>
        <AutoStoppedSetIntervalProvider>
          <AutoStoppedSetEndTimeInput />
        </AutoStoppedSetIntervalProvider>
      </ModalContent>
    </Modal>
  )
}
