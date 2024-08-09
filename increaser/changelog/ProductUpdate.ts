type ProductUpdateItem = {
  description: string
}

export const productUpdateSocials = [
  'telegram',
  'x',
  'linkedIn',
  'indieHackers',
  'reddit',
] as const
type ProductUpdateSocial = (typeof productUpdateSocials)[number]

export type ProductUpdateSocials = Partial<Record<ProductUpdateSocial, string>>

export type ProductUpdate = ProductUpdateSocials & {
  releasedAt: number
  name: string
  description: string
  videoId?: string
  items?: ProductUpdateItem[]
  // todo: add YouTube support
}
