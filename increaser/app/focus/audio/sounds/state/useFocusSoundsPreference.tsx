import {
  PersistentStateKey,
  usePersistentState,
} from '@increaser/ui/state/persistentState'

export const focusSounds = [
  'rain',
  'storm',
  'snow',
  'waterfall',
  'stream',
  'seaside',
  'wind',
  'water',
  'leaves',
  'forest',
  'fire',
  'night',
  'coffee',
  'keyboard',
  'window',
  'birds',
  'train',
  'road',
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

// export const focusSoundNameRecord: Record<FocusSound, string> = {
//   rain: 'Rain',
//   storm: 'Storm',
//   snow: 'Walk in snow',
//   waterfall: 'Waterfall',
//   stream: 'Stream',
// }
