import { ShowOnce } from 'state/ShowOnce'
import { PersistentStorageKey } from 'state/persistentStorage'
import { ShyEducation } from 'ui/ShyEducation'

export const BreakEducation = () => {
  return (
    <ShowOnce storageKey={PersistentStorageKey.BreakEducationWasAt}>
      <ShyEducation
        content="Quality breaks are essential for your ability to focus"
        source="https://youtu.be/5HINgMMTzPE?t=150"
      />
    </ShowOnce>
  )
}
