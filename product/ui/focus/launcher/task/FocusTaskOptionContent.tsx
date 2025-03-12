import { cropText } from '@lib/ui/css/cropText'
import { HStack } from '@lib/ui/css/stack'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { tightListItemConfig } from '@lib/ui/list/tightListItemConfig'
import { Text } from '@lib/ui/text'
import { ProjectEmoji } from '@product/ui/projects/ProjectEmoji'
import { useCurrentTask } from '@product/ui/tasks/CurrentTaskProvider'
import { TaskDeadlineTag } from '@product/ui/tasks/deadline/TaskDeadlineTag'
import { TaskTrackedTime } from '@product/ui/tasks/trackedTime/TaskTrackedTime'
import { ComponentProps } from 'react'
import styled from 'styled-components'

const Container = styled(HStack)`
  line-height: ${toSizeUnit(tightListItemConfig.lineHeight)};
  flex: 1;
  align-items: center;
  gap: 8px;
  ${cropText};
`

type FocusTaskOptionContentProps = ComponentProps<typeof Container> & {
  showEmoji?: boolean
}

export const FocusTaskOptionContent = ({
  showEmoji = false,
  ...props
}: FocusTaskOptionContentProps) => {
  const { name, projectId } = useCurrentTask()

  return (
    <Container {...props}>
      {showEmoji && (
        <Text color="contrast">
          <ProjectEmoji id={projectId} />
        </Text>
      )}
      <Text cropped as="span">
        {name}
      </Text>
      <TaskTrackedTime />
      <TaskDeadlineTag />
    </Container>
  )
}
