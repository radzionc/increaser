export const infoYouTubeVideos = {
  focus: 'https://youtu.be/qvIAf7kvpFk',
  trackTime: 'https://youtu.be/5fn7Iv5u-Qo',
  tasks: 'https://youtu.be/OjZrCqyfM48',
  habits: 'https://youtu.be/JFCP1CWhlzA',
  goals: 'https://youtu.be/zCrUr0SgzwQ',
  workPreferences: 'https://youtu.be/jU49KQG9XPQ',
} as const

export type InfoYouTubeVideo = keyof typeof infoYouTubeVideos
