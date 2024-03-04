import { getUser } from '@increaser/db/user'
import { assertUserId } from '../../auth/assertUserId'
import { getEnvVar } from '../../getEnvVar'
import { getTelegramBot } from '../../notifications/telegram'
import { ApiResolver } from '../../resolvers/ApiResolver'
import { putFeature } from '@increaser/db/features'
import { getProductFeautureDefaultFields } from '@increaser/entities/ProductFeature'

export const proposeFeature: ApiResolver<'proposeFeature'> = async ({
  input: feature,
  context,
}) => {
  const proposedBy = assertUserId(context)
  const { email } = await getUser(proposedBy, ['email'])

  await getTelegramBot().sendMessage(
    getEnvVar('TELEGRAM_CHAT_ID'),
    [
      'New feature proposal',
      feature.name,
      feature.description,
      `Proposed by ${email}`,
      feature.id,
    ].join('/n/n'),
  )

  await putFeature({
    ...feature,
    ...getProductFeautureDefaultFields({ proposedBy }),
  })
}
