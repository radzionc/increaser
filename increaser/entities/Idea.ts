import { EntityWithOrder } from '@lib/utils/entities/EntityWithOrder'
import { TaskTemplate } from './TaskTemplate'

export type Idea = TaskTemplate & EntityWithOrder

export type Ideas = Record<string, Idea>
