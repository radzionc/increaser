import { ScheduleContext } from '@increaser/ui/schedule/ScheduleContext'

import { ComponentWithChildrenProps } from '@lib/ui/props'
import { useUserState } from '@increaser/ui/user/UserStateContext'

export const DemoScheduleProvider = ({
  children,
}: ComponentWithChildrenProps) => {
  const { updateState } = useUserState()

  return (
    <ScheduleContext.Provider
      value={{
        updateDayMoment: (dayMoment, value) => {
          updateState({ [dayMoment]: value })
        },
      }}
    >
      {children}
    </ScheduleContext.Provider>
  )
}
