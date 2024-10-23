type ProductUpdateItem = {
  description: string
}

export const productUpdateSocials = [
  'telegram',
  'x',
  'linkedIn',
  'indieHackers',
  'reddit',
  'youtube',
] as const
export type ProductUpdateSocial = (typeof productUpdateSocials)[number]

export const productUpdateSocialName = {
  telegram: 'Telegram',
  x: 'X',
  linkedIn: 'LinkedIn',
  indieHackers: 'Indie Hackers',
  reddit: 'Reddit',
  youtube: 'YouTube',
} as const

export type ProductUpdateSocials = Partial<Record<ProductUpdateSocial, string>>

export type ProductUpdate = ProductUpdateSocials & {
  releasedAt: number
  name: string
  description: string
  items?: ProductUpdateItem[]
}
