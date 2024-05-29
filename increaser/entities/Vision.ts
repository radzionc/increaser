export const visionAttributeStatuses = [
  'done',
  'maintainance',
  'inProgress',
  'toDo',
] as const
export type VisionAttributeStatus = (typeof visionAttributeStatuses)[number]

export type VisionAttribute = {
  id: string
  order: string
  name: string
  status: VisionAttributeStatus
}

export type Vision = Record<string, VisionAttribute>
