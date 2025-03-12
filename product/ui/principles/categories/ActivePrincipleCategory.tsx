import { useUser } from '@product/ui/user/state/user'

import { ActiveUserEntity } from '../../userEntity/components/ActiveUserEntity'

import { CurrentPrincipleCategoryProvider } from './CurrentPrincipleCategoryProvider'
import { EditPricnipleCategoryForm } from './form/EditPrincipleCategoryForm'

export const ActivePrincipleCategory = () => {
  const { principleCategories } = useUser()

  return (
    <ActiveUserEntity
      items={principleCategories}
      render={({ onFinish, value }) => (
        <CurrentPrincipleCategoryProvider value={value}>
          <EditPricnipleCategoryForm onFinish={onFinish} />
        </CurrentPrincipleCategoryProvider>
      )}
    />
  )
}
