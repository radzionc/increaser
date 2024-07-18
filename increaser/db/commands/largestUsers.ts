import { getAllUsers } from '../user'
import { order } from '@lib/utils/array/order'

const largestUsers = async () => {
  const users = await getAllUsers()

  const sizeRecord: Record<string, number> = {}

  users.forEach((user) => {
    // Custom replacer function to handle BigInt values
    const jsonString = JSON.stringify(user, (key, value) =>
      typeof value === 'bigint' ? value.toString() : value,
    )

    // Calculate the byte size of the JSON string
    const byteSize = Buffer.byteLength(jsonString, 'utf8')

    // Convert bytes to kilobytes
    const kbSize = byteSize / 1024

    sizeRecord[user.id] = kbSize
  })

  const orderedUsers = order(
    Object.entries(sizeRecord),
    ([, size]) => size,
    'desc',
  )

  orderedUsers.slice(0, 10).forEach(([id, kb]) => {
    console.log(`${id}: ${kb.toFixed(2)} KB`)
  })
}

largestUsers()
