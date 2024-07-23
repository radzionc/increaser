import { productUpdates } from '@increaser/changelog/productUpdates'
import { ProductUpdateItem } from '@increaser/ui/changelog/ProductUpdateItem'
import { useUpdateUserMutation } from '@increaser/ui/user/mutations/useUpdateUserMutation'
import { VStack } from '@lib/ui/layout/Stack'
import { order } from '@lib/utils/array/order'
import { useEffect } from 'react'
import styled from 'styled-components'
import { SubscribeForUpdatesPrompt } from '../community/components/SubscribeForUpdatesPrompt'

const Container = styled(VStack)`
  gap: 40px;
  max-width: 640px;
`

export const ProductUpdates = () => {
  const items = order(productUpdates, (v) => v.releasedAt, 'desc')
  const { mutate } = useUpdateUserMutation()
  useEffect(() => {
    mutate({
      viewedNewFeaturesAt: Date.now(),
    })
  }, [mutate])

  return (
    <Container>
      <SubscribeForUpdatesPrompt />
      {items.map((value, index) => (
        <ProductUpdateItem key={index} value={value} />
      ))}
    </Container>
  )
}
