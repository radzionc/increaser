import { HSLA } from '@increaser/ui/colors/HSLA'

export type ProjectStatus = 'INACTIVE' | 'ACTIVE'

export interface ProjectWeek {
  year: number
  week: number
  seconds: number
}

export interface ProjectMonth {
  year: number
  month: number
  seconds: number
}

export interface ProjectResponse {
  id: string
  color: number
  name: string
  emoji: string
  total: number
  status: ProjectStatus
  allocatedMinutesPerWeek: number
  weeks: ProjectWeek[]
  months: ProjectMonth[]
}

export interface Project extends ProjectResponse {
  doneMinutesThisWeek: number
  hslaColor: HSLA
}

export const defaultEmojis = [
  '👨‍💻',
  '🧐',
  '🤓',
  '😎',
  '🤩',
  '🤯',
  '🥴',
  '🤑',
  '🤖',
  '🎃',
  '👋',
  '✌️',
  '🤝',
  '✍️',
  '💪',
  '👁',
  '🕵️‍♂️',
  '👨‍⚕️',
  '👨‍🍳',
  '👨‍🎓',
  '👨‍🎤',
  '👩‍🏫',
  '👨‍🔬',
  '👨‍🎨',
  '💃',
  '🧳',
  '💼',
  '🎓',
  '🐶',
  '🙈',
  '🌝',
  '🔥',
  '🫐',
  '🏋️‍♂️',
  '🏄‍♂️',
  ' 🎼',
  '🎬',
  '🎨',
  '🎸',
  '🌋',
  '⛩',
  '🛠',
  '🧨',
]
