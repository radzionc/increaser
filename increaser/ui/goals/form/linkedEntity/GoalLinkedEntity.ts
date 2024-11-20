export type GoalLinkedEntity = 'vision' | 'taskFactory' | 'habit' | 'principle'

export const goalLinkedEntityTitle: Record<GoalLinkedEntity, string> = {
  vision: 'Vision driving this goal',
  taskFactory: 'Recurring tasks',
  habit: 'Habits',
  principle: 'Principles',
}
