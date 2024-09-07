import { FocusDuration } from '@increaser/entities/FocusDuration'
import { ContextState } from '@lib/ui/state/ContextState'
import { createContextHook } from '@lib/ui/state/createContextHook'
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react'
import { suggestFocusDuration } from '../../FocusDuration'
import { useStartOfDay } from '@lib/ui/hooks/useStartOfDay'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { useTodaySets } from '../../../sets/hooks/useTodaySets'
import { MS_IN_MIN } from '@lib/utils/time'
import { ComponentWithChildrenProps } from '@lib/ui/props'
import { useLastChangeAt } from '@lib/ui/hooks/useLastChangeAt'

type FocusLauncherDurationState = ContextState<FocusDuration>

const FocusLauncherDurationContext = createContext<
  FocusLauncherDurationState | undefined
>(undefined)

export const useFocusTargetDuration = createContextHook<
  FocusLauncherDurationState,
  [FocusDuration, Dispatch<SetStateAction<FocusDuration>>]
>(FocusLauncherDurationContext, 'FocusLauncherDurationContext', (result) => [
  result.value,
  result.setValue,
])

export const FocusLauncherDurationProvider = ({
  children,
}: ComponentWithChildrenProps) => {
  const todayStartedAt = useStartOfDay()
  const { finishWorkAt } = useAssertUserState()
  const todaySets = useTodaySets()

  const [value, setValue] = useState<FocusDuration>(() =>
    suggestFocusDuration({
      todayStartedAt,
      finishWorkAt,
      todaySets,
    }),
  )

  const valueChangedAt = useLastChangeAt(value)

  useEffect(() => {
    const updateSuggestions = () => {
      setValue(
        suggestFocusDuration({
          todayStartedAt,
          finishWorkAt,
          todaySets,
        }),
      )
    }

    const interval = setInterval(updateSuggestions, MS_IN_MIN)

    return () => clearInterval(interval)
  }, [valueChangedAt, finishWorkAt, todaySets, todayStartedAt])

  return (
    <FocusLauncherDurationContext.Provider value={{ value, setValue }}>
      {children}
    </FocusLauncherDurationContext.Provider>
  )
}
