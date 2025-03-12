import { memoizeAsync } from '@lib/utils/memoizeAsync'
import { getSecret } from '@product/secrets'
import TelegramBot from 'node-telegram-bot-api'

export const getTelegramBot = memoizeAsync(async () => {
  const token = await getSecret('telegramBotToken')

  return new TelegramBot(token)
})
