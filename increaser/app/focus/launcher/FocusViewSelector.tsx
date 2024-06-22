import { RadioInput } from '@lib/ui/inputs/RadioInput'

import {
  FocusEntity,
  focusEntities,
  useFocusLauncher,
} from './state/FocusLauncherContext'

const focusEntityViewName: Record<FocusEntity, string> = {
  project: 'Projects',
  task: 'Tasks',
}

export const FocusViewSelector = () => {
  const { focusEntity, setState } = useFocusLauncher()

  return (
    <RadioInput
      options={focusEntities}
      value={focusEntity}
      onChange={(focusEntity) =>
        setState((state) => ({ ...state, focusEntity }))
      }
      renderOption={(option) => focusEntityViewName[option]}
      minOptionHeight={40}
    />
  )
}
