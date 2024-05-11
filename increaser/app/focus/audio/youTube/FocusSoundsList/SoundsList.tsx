import { VStack } from '@lib/ui/layout/Stack'

import { useFocusSounds } from '../useFocusSounds'
import { SoundItem } from './SoundItem'

export const SoundsList = () => {
  const { sounds } = useFocusSounds()

  return (
    <VStack fullWidth>
      {sounds.map((sound, index) => (
        <SoundItem key={index} index={index} {...sound} />
      ))}
    </VStack>
  )
}
