import { getAllUsers } from '../user'
;(async () => {
  const users = await getAllUsers(['id', 'vision'])

  const items: Record<string, number> = {}
  users.forEach((user) => {
    if (user.vision) {
      Object.values(user.vision).forEach(({ name }) => {
        if (!items[name]) {
          items[name] = 0
        }
        items[name]++
      })
    }
  })

  const sortedItems = Object.entries(items).sort((a, b) => b[1] - a[1])
  console.log(
    sortedItems.map(([item, count]) => `${item}: ${count}`).join('\n'),
  )
})()
