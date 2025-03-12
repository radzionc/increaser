import { useUser } from '@product/ui/user/state/user'

import { ActiveUserEntity } from '../userEntity/components/ActiveUserEntity'

import { CurrentPrincipleProvider } from './CurrentPrincipleProvider'
import { EditPrincipleForm } from './form/EditPrincipleForm'

export const ActivePrinciple = () => {
  const { principles } = useUser()

  return (
    <ActiveUserEntity
      items={principles}
      render={({ onFinish, value }) => (
        <CurrentPrincipleProvider value={value}>
          <EditPrincipleForm onFinish={onFinish} />
        </CurrentPrincipleProvider>
      )}
    />
  )
}
