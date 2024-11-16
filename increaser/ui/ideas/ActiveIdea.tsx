import { useUser } from '@increaser/ui/user/state/user'
import { CurrentIdeaProvider } from './CurrentIdeaProvider'
import { EditIdeaForm } from './form/EditIdeaForm'
import { ActiveUserEntity } from '../userEntity/components/ActiveUserEntity'

export const ActiveIdea = () => {
  const { ideas } = useUser()

  return (
    <ActiveUserEntity
      items={ideas}
      render={({ onFinish, value }) => (
        <CurrentIdeaProvider value={value}>
          <EditIdeaForm onFinish={onFinish} />
        </CurrentIdeaProvider>
      )}
    />
  )
}
