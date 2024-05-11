import { FocusSounds as FocusSoundsContent } from './FocusSounds'
import { FocusSoundsProvider } from './FocusSoundsProvider'

export const YouTubeFocusWidget = () => {
  return (
    <FocusSoundsProvider>
      <FocusSoundsContent />
    </FocusSoundsProvider>
  )
}
