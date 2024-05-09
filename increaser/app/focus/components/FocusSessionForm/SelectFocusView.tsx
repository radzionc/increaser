import { getViewSetup } from '@lib/ui/view/getViewSetup'
import { RadioInput } from '@lib/ui/inputs/RadioInput'
import {
  PersistentStateKey,
  managePersistentState,
} from '../../../state/persistentState'

export const selectFocusViews = ['projects', 'tasks'] as const
export type SelectFocusView = (typeof selectFocusViews)[number]

const persistentView = managePersistentState<SelectFocusView>(
  PersistentStateKey.SelectFocusView,
)

export const {
  ViewProvider: SelectFocusViewProvider,
  useView: useSelectFocusView,
  RenderView: RenderSelectFocusView,
} = getViewSetup<SelectFocusView>({
  defaultView: persistentView.get() ?? 'projects',
  name: 'SelectFocus',
  onChange: persistentView.set,
})

const taskViewName: Record<SelectFocusView, string> = {
  projects: 'Projects',
  tasks: 'Tasks',
}

export const SelectFocusViewSelector = () => {
  const { view, setView } = useSelectFocusView()

  return (
    <RadioInput
      options={selectFocusViews}
      value={view}
      onChange={setView}
      renderOption={(option) => taskViewName[option]}
      minOptionHeight={40}
    />
  )
}
