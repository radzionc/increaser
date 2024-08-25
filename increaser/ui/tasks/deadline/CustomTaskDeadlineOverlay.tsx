import { FormActions } from '@lib/ui/form/components/FormActions'
import { useStartOfDay } from '@lib/ui/hooks/useStartOfDay'
import { Modal } from '@lib/ui/modal'
import { DayInput } from '@lib/ui/time/day/DayInput'
import { Day, fromDay, toDay } from '@lib/utils/time/Day'
import { useState } from 'react'
import { endOfDay, addYears } from 'date-fns'

type Props = {
  onFinish: (value?: number) => void
}

export const CustomTaskDeadlineOverlay = ({ onFinish }: Props) => {
  const todayStartedAt = useStartOfDay()
  const endOfToday = endOfDay(todayStartedAt).getTime()
  const min = toDay(endOfToday)
  const [value, setValue] = useState<Day>(min)

  const max = toDay(addYears(endOfToday, 5).getTime())

  return (
    <Modal
      onClose={() => onFinish()}
      footer={
        <FormActions
          onSubmit={() => {
            onFinish(fromDay(value))
          }}
          onCancel={() => onFinish()}
        />
      }
      title="Set a deadline"
    >
      <DayInput min={min} max={max} value={value} onChange={setValue} />
    </Modal>
  )
}
