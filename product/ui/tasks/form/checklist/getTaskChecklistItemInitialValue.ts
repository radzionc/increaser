import { getId } from '@product/entities-utils/shared/getId'

export const getTaskChecklistItemInitialValue = () => ({
  name: '',
  completed: false,
  order: 0,
  id: getId(),
})
