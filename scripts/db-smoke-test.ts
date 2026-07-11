/**
 * Teste manual de fumaça contra o DynamoDB local (dynalite).
 * Roda getUser/putUser/getUserByEmail/deleteUser de verdade.
 *
 * Uso: DYNAMODB_LOCAL=true npx tsx scripts/db-smoke-test.ts
 */
import { deleteUser, getUser, getUserByEmail, putUser } from '@product/db/user'
import { userDefaultFields } from '@product/entities/User'

const id = 'smoke-test-user'
const email = 'smoke-test@example.com'

const main = async () => {
  console.log('1) putUser...')
  await putUser({
    id,
    email,
    registrationDate: Date.now(),
    freeTrialEnd: Date.now(),
    lastSyncedMonthEndedAt: Date.now(),
    lastSyncedWeekEndedAt: Date.now(),
    lastVisitAt: Date.now(),
    viewedNewFeaturesAt: Date.now(),
    viewedHabitsAt: Date.now(),
    timeZone: 0,
    ...userDefaultFields,
  } as any)
  console.log('   ok')

  console.log('2) getUser...')
  const user = await getUser(id, ['id', 'email'])
  console.log('   resultado:', user)
  if (user?.email !== email)
    throw new Error('getUser não retornou o email esperado')

  console.log('3) getUserByEmail (usa o GSI EmailIndex)...')
  const byEmail = await getUserByEmail(email, ['id'])
  console.log('   resultado:', byEmail)
  if (byEmail?.id !== id)
    throw new Error('getUserByEmail não encontrou o usuário')

  console.log('4) deleteUser...')
  await deleteUser(id)
  const stillExists = await getUser(id, ['id'])
    .then(() => true)
    .catch(() => false)
  console.log('   ainda existe após delete?', stillExists)
  if (stillExists) throw new Error('usuário não foi removido')

  console.log(
    '\n✅ Banco local (dynalite) está funcional: write, read, query por índice e delete OK.',
  )
}

main().catch((err) => {
  console.error('\n❌ Teste falhou:', err)
  process.exit(1)
})
