import { BookIcon } from '@lib/ui/icons/BookIcon'
import { ExpandableSelectorContainer } from '@lib/ui/select/ExpandableSelectorContainer'

type TaskTemplatesWidgetProps = {
  projectId: string
}

export const TaskTemplatesWidget = ({
  projectId,
}: TaskTemplatesWidgetProps) => {
  console.log(projectId)
  return (
    <ExpandableSelectorContainer title="Templates">
      <BookIcon />
    </ExpandableSelectorContainer>
  )
}
