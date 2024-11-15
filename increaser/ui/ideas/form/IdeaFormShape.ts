import { Idea } from '@increaser/entities/Idea'

export type IdeaFormShape = Omit<Idea, 'id' | 'order'>
