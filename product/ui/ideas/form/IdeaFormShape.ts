import { Idea } from '@product/entities/Idea'

export type IdeaFormShape = Omit<Idea, 'id' | 'order'>
