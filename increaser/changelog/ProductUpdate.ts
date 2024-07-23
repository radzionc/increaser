export type ProductUpdateItem = {
  description: string
}

export type ProductUpdate = {
  releasedAt: number
  name: string
  description: string
  videoId?: string
  items?: ProductUpdateItem[]
}
