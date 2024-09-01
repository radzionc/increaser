import { FocusLauncherForm } from './FocusLauncherForm'
import { FocusLauncherDurationProvider } from './state/FocusLauncherDurationProvider'
import { FocusLauncherStartTimeProvider } from './state/FocusLauncherStartTimeProvider'

export const FocusLauncher = () => {
  return (
    <FocusLauncherDurationProvider>
      <FocusLauncherStartTimeProvider initialValue={null}>
        <FocusLauncherForm />
      </FocusLauncherStartTimeProvider>
    </FocusLauncherDurationProvider>
  )
}
