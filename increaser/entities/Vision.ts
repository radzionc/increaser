export const visionAttributeStatuses = [
  'done',
  'maintainance',
  'inProgress',
  'toDo',
] as const
export type VisionAttributeStatus = (typeof visionAttributeStatuses)[number]

export const visionAttributeStatusNameRecord: Record<
  VisionAttributeStatus,
  string
> = {
  done: 'Done',
  maintainance: 'Maintainance',
  inProgress: 'Working on it',
  toDo: 'To do',
}

export type VisionAttribute = {
  id: string
  order: number
  name: string
  status: VisionAttributeStatus
  imageId?: string | null
}

export type Vision = Record<string, VisionAttribute>
