import { PageHeaderControlsArea } from '@increaser/app/ui/page/header/PageHeaderControlsAreaProvider'
import { AddTask } from '../AddTask'
import { TaskBoard } from './TaskBoard'
import { getProjectId } from '@increaser/entities-utils/project/getProjectId'
import { useFilterByProject } from '../../projects/filter/project/state/projectFilter'
import { useTasks } from '../hooks/useTasks'

export const TaskBoardPage = () => {
  const items = useFilterByProject(useTasks(), getProjectId)

  return (
    <>
      <PageHeaderControlsArea>
        <AddTask />
      </PageHeaderControlsArea>
      <TaskBoard items={items} />
    </>
  )
}
