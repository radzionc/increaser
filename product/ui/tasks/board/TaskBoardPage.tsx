import { PageHeaderControlsArea } from '@product/app/ui/page/header/PageHeaderControlsAreaProvider'
import { getProjectId } from '@product/entities-utils/project/getProjectId'

import { useFilterByProject } from '../../projects/filter/project/state/projectFilter'
import { AddTask } from '../AddTask'
import { useTasks } from '../hooks/useTasks'

import { TaskBoard } from './TaskBoard'

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
