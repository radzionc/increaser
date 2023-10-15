import { getAuthSession } from '../auth/utils/getAuthSession'

const command = async (id: string) => {
  const session = await getAuthSession(id)
  console.log(session)

  console.log(
    `localStorage.setItem('auth-session', '${JSON.stringify(session)}')`,
  )
}

const id = process.argv[2]
command(id)
