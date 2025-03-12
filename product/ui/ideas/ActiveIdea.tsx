import { useUser } from '@product/ui/user/state/user'

import { ActiveUserEntity } from '../userEntity/components/ActiveUserEntity'

import { CurrentIdeaProvider } from './CurrentIdeaProvider'
import { EditIdeaForm } from './form/EditIdeaForm'

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
