import { useUser } from '@increaser/ui/user/state/user'
import { ActiveUserEntity } from '../userEntity/components/ActiveUserEntity'
import { CurrentVisionAttributeProvider } from './CurrentVisionAttributeProvider'
import { EditVisionAttributeForm } from './form/EditVisionAttributeForm'

export const ActiveVisionItem = () => {
  const { vision } = useUser()

  return (
    <ActiveUserEntity
      items={vision}
      render={({ onFinish, value }) => (
        <CurrentVisionAttributeProvider value={value}>
          <EditVisionAttributeForm onFinish={onFinish} />
        </CurrentVisionAttributeProvider>
      )}
    />
  )
}
