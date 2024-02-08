import { isEmpty } from '../array/isEmpty'

type GetNewOrderInput = {
  orders: number[]
  sourceIndex: number | null
  destinationIndex: number
}

export const getNewOrder = ({
  orders,
  sourceIndex,
  destinationIndex,
}: GetNewOrderInput): number => {
  console.log({
    orders,
    destinationIndex,
  })
  if (isEmpty(orders)) {
    return 0
  }

  if (destinationIndex === 0) {
    return orders[0] - 1
  }

  const movedUp = sourceIndex !== null && sourceIndex < destinationIndex
  const previousIndex = movedUp ? destinationIndex : destinationIndex - 1
  const previous = orders[previousIndex]

  if (destinationIndex === orders.length - 1 && sourceIndex !== null) {
    return previous + 1
  }

  const nextIndex = movedUp ? destinationIndex + 1 : destinationIndex
  const next = orders[nextIndex]

  return previous + (next - previous) / 2
}
