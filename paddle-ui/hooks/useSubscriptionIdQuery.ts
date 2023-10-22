import { useQuery } from 'react-query'

export const useSubscriptionIdQuery = (checkoutId: string) => {
  return useQuery(['subscriptionId', checkoutId], () => {
    return new Promise<string>((resolve, reject) => {
      if (window.Paddle) {
        window.Paddle.Order.details(checkoutId, ({ order }) => {
          if (order) {
            resolve(order.subscription_id)
          } else {
            reject(new Error('Order not found'))
          }
        })
      } else {
        reject(new Error('Paddle not initialized'))
      }
    })
  })
}
