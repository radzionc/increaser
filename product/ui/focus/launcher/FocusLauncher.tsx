import { FocusLauncherForm } from './FocusLauncherForm'
import { FocusLauncherStartTimeProvider } from './state/FocusLauncherStartTimeProvider'

export const FocusLauncher = () => {
  return (
    <FocusLauncherStartTimeProvider initialValue={null}>
      <FocusLauncherForm />
    </FocusLauncherStartTimeProvider>
  )
}
