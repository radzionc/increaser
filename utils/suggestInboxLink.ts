import { isOneOf } from './array/isOneOf'
import { extractEmailProvider } from './extractEmailProvider'
import { match } from './match'

const emailProvidersWithClient = [
  'gmail',
  'outlook',
  'hotmail',
  'live',
  'yahoo',
  'protonmail',
  'aol',
  'zoho',
] as const

const outlookInboxLink = 'https://outlook.live.com/mail/0/inbox'

export const suggestInboxLink = (
  email: string,
  sender: string,
): string | undefined => {
  const emailProvider = extractEmailProvider(email)
  if (!emailProvider) return undefined

  const emailProviderWithClient = isOneOf(
    emailProvidersWithClient,
    emailProvider,
  )
  if (!emailProviderWithClient) return undefined

  return match(emailProviderWithClient, {
    gmail: () => {
      const searchStr = encodeURIComponent(`from:@${sender}+in:anywhere`)
      return ['https://mail.google.com/mail/u/0/#search', searchStr].join('/')
    },
    outlook: () => outlookInboxLink,
    hotmail: () => outlookInboxLink,
    live: () => outlookInboxLink,
    yahoo: () => 'https://mail.yahoo.com/d/folders/1',
    protonmail: () => 'https://mail.protonmail.com/u/0/inbox',
    aol: () => 'https://mail.aol.com/webmail-std/en-us/inbox',
    zoho: () => 'https://mail.zoho.com/zm/#mail/folder/inbox',
  })
}
