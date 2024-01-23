type ProjectItemProps = {
  id?: string
  name?: string
  color: number
  emoji: string
}

export const ProjectItem = ({ id, name, color, emoji }: ProjectItemProps) => {
  console.log(id, name, color, emoji)
  return null
}
