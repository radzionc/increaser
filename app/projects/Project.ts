import { Project } from '@increaser/entities/Project'
import { HSLA } from '@increaser/ui/colors/HSLA'

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
