import { useUpdateUserMutation } from '@increaser/ui/user/mutations/useUpdateUserMutation'

import { useEffect } from 'react'
import { ProductUpdatesList } from './ProductUpdatesList'

export const ProductUpdates = () => {
  const { mutate } = useUpdateUserMutation()
  useEffect(() => {
    mutate({
      viewedNewFeaturesAt: Date.now(),
    })
  }, [mutate])

  return <ProductUpdatesList />
}
