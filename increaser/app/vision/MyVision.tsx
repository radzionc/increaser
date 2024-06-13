import { VStack } from '@lib/ui/layout/Stack'
import { UserStateOnly } from '../user/state/UserStateOnly'
import { MyVisionViewSelector } from './MyVisionView'
import { MyVisionContent } from './MyVisionContent'

export const MyVision = () => {
  return (
    <UserStateOnly>
      <VStack gap={20}>
        <MyVisionViewSelector />
        <MyVisionContent />
      </VStack>
    </UserStateOnly>
  )
}
