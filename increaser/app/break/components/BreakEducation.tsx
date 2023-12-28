import { ShowOnce } from '@increaser/app/state/ShowOnce'
import { PersistentStateKey } from '@increaser/app/state/persistentState'
import { ShyEducation } from '@increaser/app/ui/ShyEducation'

export const BreakEducation = () => {
  return (
    <ShowOnce storageKey={PersistentStateKey.BreakEducationWasAt}>
      <ShyEducation
        content="Quality breaks are essential for your ability to focus"
        source="https://youtu.be/5HINgMMTzPE?t=150"
      />
    </ShowOnce>
  )
}
