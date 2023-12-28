export const getSanitizedName = (name: string) => {
  if (!name) {
    return name
  }

  const [emailCleanName] = name.split('@')

  return emailCleanName
}
