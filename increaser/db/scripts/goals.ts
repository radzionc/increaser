import { getAllUsers } from '../user'
;(async () => {
  const users = await getAllUsers(['id', 'goals'])

  const goals: Record<string, number> = {}
  users.forEach((user) => {
    if (user.goals) {
      Object.values(user.goals).forEach(({ name }) => {
        if (!goals[name]) {
          goals[name] = 0
        }
        goals[name]++
      })
    }
  })

  const sortedGoals = Object.entries(goals).sort((a, b) => b[1] - a[1])
  console.log(
    sortedGoals.map(([goal, count]) => `${goal}: ${count}`).join('\n'),
  )
})()
