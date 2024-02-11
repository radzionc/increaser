import { SubscriptionBillingCycle } from '@increaser/entities/Subscription'

import { useQuery } from '@tanstack/react-query'
import { PaddleSdk, PaddleSdkProductPrice } from '../PaddleSdk'
import { ProductPlanPrice } from '../ProductPlanPrice'
import { paddleProductCode } from '../paddleProductCode'
import { usePaddleSdk } from './usePaddleSdk'

const getPaddleProductPrice = async (
  Paddle: PaddleSdk,
  product: number,
): Promise<ProductPlanPrice> => {
  const { price }: PaddleSdkProductPrice = await new Promise((resolve) =>
    Paddle.Product.Prices(product, resolve),
  )

  const { gross } = price

  const index = gross.search(/\d/)
  let currency = gross.slice(0, index)
  if (currency === 'US$') {
    currency = '$'
  }
  const amountAsString = gross.slice(index).replace(',', '')
  const amount = Number(amountAsString)

  return { currency, amount }
}

export const subscriptionPricesQueryKey = ['subscriptionPrices']

export type SubscriptionPrices = Record<
  SubscriptionBillingCycle,
  ProductPlanPrice
>

export const useSubscriptionPricesQuery = () => {
  const { data: paddleSdk } = usePaddleSdk()

  return useQuery({
    queryKey: subscriptionPricesQueryKey,
    queryFn: async () => {
      const [month, year] = await Promise.all(
        [paddleProductCode.month, paddleProductCode.year].map((product) =>
          getPaddleProductPrice(paddleSdk as PaddleSdk, product),
        ),
      )

      return {
        month,
        year,
      } as Record<SubscriptionBillingCycle, ProductPlanPrice>
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
    enabled: !!paddleSdk,
  })
}
