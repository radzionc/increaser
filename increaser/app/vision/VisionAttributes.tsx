import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { VStack } from '@lib/ui/layout/Stack'
import { VisionAttributeItem } from './VisionAttributeItem'
import { CurrentVisionAttributeProvider } from './CurrentVisionAttributeProvider'

export const VisionAttributes = () => {
  const { vision } = useAssertUserState()

  return (
    <VStack>
      {Object.values(vision).map((value) => (
        <CurrentVisionAttributeProvider key={value.id} value={value}>
          <VisionAttributeItem />
        </CurrentVisionAttributeProvider>
      ))}
    </VStack>
  )
}
