import { FocusSounds as FocusSoundsContent } from './FocusSounds'
import { FocusSoundsProvider } from './FocusSoundsProvider'

export const FocusSounds = () => {
  return (
    <FocusSoundsProvider>
      <FocusSoundsContent />
    </FocusSoundsProvider>
  )
}
