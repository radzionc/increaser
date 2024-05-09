import { Set } from '@increaser/entities/User'
import { createContextHook } from '@lib/ui/state/createContextHook'
import { Dispatch, SetStateAction, createContext } from 'react'

import { Interval } from '@lib/utils/interval/Interval'

type TrackTimeSet = Set & {
  index?: number
}

export type TrackTimeMutableState = {
  weekday: number
  currentSet: TrackTimeSet | null
}

type TrackTimeState = TrackTimeMutableState & {
  setState: Dispatch<SetStateAction<TrackTimeMutableState>>

  sets: Set[]
  dayInterval: Interval
}

export const TrackTimeContext = createContext<TrackTimeState | undefined>(
  undefined,
)

export const useTrackTime = createContextHook(TrackTimeContext, 'TrackTime')
