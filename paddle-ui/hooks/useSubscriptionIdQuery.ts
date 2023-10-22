import { useQuery } from 'react-query'

export const useSubscriptionIdQuery = (checkoutId: string) => {
  return useQuery<string, Error>(['subscriptionId', checkoutId], () => {
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
  })
}
