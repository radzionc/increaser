import { useActiveSet } from './ActiveSetProvider'
import { SetEditorForm } from './editor/SetEditorForm'
import { SetsOverview } from './overview/SetsOverview'

export const SetsManagerContent = () => {
  const [activeSet] = useActiveSet()

  return activeSet ? <SetEditorForm /> : <SetsOverview />
}
