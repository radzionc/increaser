import { MembershipPeriod } from 'membership'
import { usePaddleSdk } from 'membership/paddle/hooks/usePaddleSdk'
import { PaddleProductCode } from 'membership/paddle/PaddleProductCode'
import { PaddleSdk, PaddleSdkProductPrice } from 'membership/paddle/PaddleSdk'
import { ProductPlanPrice } from 'membership/ProductPlanPrice'
import { useQuery } from 'react-query'

const getPaddleProductPrice = async (
  Paddle: PaddleSdk,
  product: number,
): Promise<ProductPlanPrice> => {
  const { price }: PaddleSdkProductPrice = await new Promise((resolve) =>
    Paddle.Product.Prices(product, resolve),
  )

  const { gross } = price

  const index = gross.search(/\d/)
  const currency = gross.slice(0, index)
  const amountAsString = gross.slice(index).replace(',', '')
  const amount = Number(amountAsString)

  return { currency, amount }
}

export const membershipPricesQueryKey = 'membershipPrices'

export const useMembershipPricesQuery = () => {
  const { data: paddleSdk } = usePaddleSdk()

  return useQuery(
    membershipPricesQueryKey,
    async () => {
      const [monthly, yearly] = await Promise.all(
        [PaddleProductCode.monthly, PaddleProductCode.yearly].map((product) =>
          getPaddleProductPrice(paddleSdk as PaddleSdk, product),
        ),
      )

      return {
        monthly,
        yearly,
      } as Record<MembershipPeriod, ProductPlanPrice>
    },
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      staleTime: Infinity,
      enabled: !!paddleSdk,
    },
  )
}
