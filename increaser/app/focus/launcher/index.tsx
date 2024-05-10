import { FocusLauncherForm } from './FocusLauncherForm'
import { SelectFocusViewProvider } from './SelectFocusView'

export const FocusLauncher = () => (
  <SelectFocusViewProvider>
    <FocusLauncherForm />
  </SelectFocusViewProvider>
)
