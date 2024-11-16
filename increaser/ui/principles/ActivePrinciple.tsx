import { useUser } from '@increaser/ui/user/state/user'
import { CurrentPrincipleProvider } from './CurrentPrincipleProvider'
import { ActiveUserEntity } from '../userEntity/components/ActiveUserEntity'
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
