/**
 * Cria um usuário real no DynamoDB local para testar o login por e-mail
 * sem depender de envio de e-mail de verdade.
 *
 * Uso: DYNAMODB_LOCAL=true npx tsx scripts/seed-local-user.ts
 */
import { getUserByEmail, putUser } from '@product/db/user'
import { userDefaultFields } from '@product/entities/User'

const id = 'local-real-user'
const email = 'local-test@example.com'

const main = async () => {
  const existing = await getUserByEmail(email, ['id']).catch(() => null)
  if (existing) {
    console.log('Usuário já existe:', existing)
    return
  }

  await putUser({
    id,
    email,
    registrationDate: Date.now(),
    freeTrialEnd: Date.now() + 1000 * 60 * 60 * 24 * 365,
    lastSyncedMonthEndedAt: Date.now(),
    lastSyncedWeekEndedAt: Date.now(),
    lastVisitAt: Date.now(),
    viewedNewFeaturesAt: Date.now(),
    viewedHabitsAt: Date.now(),
    timeZone: 0,
    ...userDefaultFields,
  } as any)

  console.log(`Usuário criado: id=${id} email=${email}`)
}

main()
