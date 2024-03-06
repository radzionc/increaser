import TelegramBot from 'node-telegram-bot-api'
import { getEnvVar } from '../getEnvVar'

const sendTelegramMsg = () => {
  const bot = new TelegramBot(getEnvVar('TELEGRAM_BOT_TOKEN'))

  const chatId = getEnvVar('TELEGRAM_CHAT_ID')
  console.log('chat id: ', chatId)

  bot.sendMessage(chatId, 'Hello from Increaser!')
}

sendTelegramMsg()
