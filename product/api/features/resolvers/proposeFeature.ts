import { putFeature } from '@product/db/features'
import { getUser } from '@product/db/user'
import { getProductFeautureDefaultFields } from '@product/entities/ProductFeature'

import { assertUserId } from '../../auth/assertUserId'
import { getEnvVar } from '../../getEnvVar'
import { getTelegramBot } from '../../notifications/telegram'
import { ApiResolver } from '../../resolvers/ApiResolver'

export const proposeFeature: ApiResolver<'proposeFeature'> = async ({
  input: feature,
  context,
}) => {
  const proposedBy = assertUserId(context)
  const { email } = await getUser(proposedBy, ['email'])

  const telegramBot = await getTelegramBot()

  await telegramBot.sendMessage(
    getEnvVar('TELEGRAM_CHAT_ID'),
    [
      'New feature proposal',
      feature.name,
      feature.description,
      `Proposed by ${email}`,
      feature.id,
    ].join('\n\n'),
  )

  await putFeature({
    ...feature,
    ...getProductFeautureDefaultFields({ proposedBy }),
  })
}
