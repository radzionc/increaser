import {
  PersistentStateKey,
  usePersistentState,
} from '../../../../state/persistentState'

export const focusSounds = [
  'rain',
  'storm',
  'wind',
  'forest',
  'stream',
  'seaside',
  'fire',
  'night',
  'coffee',
  'train',
  'leaves',
  'water',
  'white',
  'pink',
  'brown',
] as const

export type FocusSound = (typeof focusSounds)[number]

type FocusSoundsPreference = Partial<Record<FocusSound, number>>

export const useFocusSoundsPreference = () => {
  return usePersistentState<FocusSoundsPreference>(
    PersistentStateKey.FocusSoundsPreference,
    {
      coffee: 0.8,
      rain: 0.4,
    },
  )
}
