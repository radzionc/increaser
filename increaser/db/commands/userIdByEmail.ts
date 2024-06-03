import { getUserByEmail } from '../user'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'

export const userEmailById = async (email: string) => {
  const startedAt = Date.now()
  const { id } = shouldBePresent(await getUserByEmail(email, ['id']))
  const finishedAt = Date.now()
  console.log(`Operation took ${finishedAt - startedAt} ms`)
  console.log(id)
}

userEmailById('geekrodion@gmail.com')
