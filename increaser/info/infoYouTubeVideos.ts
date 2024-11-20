import { ProductTool } from '@increaser/entities/ProductTool'

export const infoYouTubeVideos: Record<ProductTool, string> = {
  focus: 'https://youtu.be/qvIAf7kvpFk',
  trackTime: 'https://youtu.be/5fn7Iv5u-Qo',
  tasks: 'https://youtu.be/OjZrCqyfM48',
  habits: 'https://youtu.be/JFCP1CWhlzA',
  goals: 'https://youtu.be/zCrUr0SgzwQ',
  workPreferences: 'https://youtu.be/jU49KQG9XPQ',
  principles: 'https://youtu.be/ukTAEMrVJxA',
  vision: 'https://youtu.be/6eWq5k2Ob0Y',
} as const

export type InfoYouTubeVideo = keyof typeof infoYouTubeVideos
