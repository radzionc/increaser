import { Project } from '@product/entities/Project'

export const getProjectShortcuts = (projects: Project[]) => {
  const shortcuts = new Map<string, string>()
  const usedLetters = new Set<string>()

  for (const project of projects) {
    const firstChar = project.name[0]
    if (!firstChar) continue

    const letter = firstChar.toLowerCase()
    if (!/^[a-z]$/.test(letter)) continue

    if (!usedLetters.has(letter)) {
      shortcuts.set(letter, project.id)
      usedLetters.add(letter)
    }
  }

  return shortcuts
}
