import { Goal } from '@increaser/entities/Goal'

export type VisionAttributeFormShape = Pick<
  Goal,
  'name' | 'status' | 'deadlineAt'
>
