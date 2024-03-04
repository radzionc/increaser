import { memoize } from '@lib/utils/memoize'
import TelegramBot from 'node-telegram-bot-api'
import { getEnvVar } from '../getEnvVar'

export const getTelegramBot = memoize(
  () => new TelegramBot(getEnvVar('TELEGRAM_BOT_TOKEN')),
)
