import { Project } from '@increaser/entities/Project'
import { HSLA } from '@lib/ui/colors/HSLA'

export interface EnhancedProject extends Project {
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
