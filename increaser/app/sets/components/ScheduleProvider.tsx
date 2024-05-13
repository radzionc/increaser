import { ScheduleContext } from '@increaser/ui/schedule/ScheduleContext'

import { ComponentWithChildrenProps } from '@lib/ui/props'
import { useUpdateUserMutation } from '@increaser/ui/user/mutations/useUpdateUserMutation'

export const ScheduleProvider = ({ children }: ComponentWithChildrenProps) => {
  const { mutate: updateUser } = useUpdateUserMutation()

  return (
    <ScheduleContext.Provider
      value={{
        updateDayMoment: (dayMoment, value) => {
          updateUser({ [dayMoment]: value })
        },
      }}
    >
      {children}
    </ScheduleContext.Provider>
  )
}
