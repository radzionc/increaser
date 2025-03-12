import { useQuery } from '@tanstack/react-query'

export const useSubscriptionIdQuery = (checkoutId: string) => {
  return useQuery<string, Error>({
    queryKey: ['subscriptionId', checkoutId],
    queryFn: () => {
      return new Promise<string>((resolve, reject) => {
        if (window.Paddle) {
          window.Paddle.Order.details(
            checkoutId,
            ({ order }) => {
              if (order) {
                resolve(order.subscription_id.toString())
              } else {
                reject(new Error('Order not found'))
              }
            },
            false,
          )
        } else {
          reject(new Error('Paddle not initialized'))
        }
      })
    },
  })
}
