import { Modal } from '@lib/ui/modal'
import { useCallback } from 'react'

import { getFormProps } from '@lib/ui/form/utils/getFormProps'
import { EditFormFooter } from '@lib/ui/form/components/EditFormFooter'

import { useKeyDown } from '@lib/ui/hooks/useKeyDown'
import { useUpdateSetMutation } from '../../sets/api/useUpdateSetMutation'
import { omit } from '@lib/utils/record/omit'
import { useSetEndTime } from './state/setEndTime'
import { AutoStoppedSetIntervalProvider } from './AutoStoppedSetIntervalProvider'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { useLastSet } from '@increaser/app/sets/hooks/useLastSet'
import { AutoStoppedSetEndTimeInput } from './AutoStoppedSetEndTimeInput'
import { ModalContent } from '@lib/ui/modal/ModalContent'

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
