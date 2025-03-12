import { getEnvVar } from '../getEnvVar'
import { getTelegramBot } from '../notifications/telegram'

const sendTelegramMsg = async () => {
  const bot = await getTelegramBot()

  const chatId = getEnvVar('TELEGRAM_CHAT_ID')
  console.log('chat id: ', chatId)

  bot.sendMessage(chatId, 'Hello from Increaser!')
}

sendTelegramMsg()
