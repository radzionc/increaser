import { getId } from '@increaser/entities-utils/shared/getId'

export const getTaskChecklistItemInitialValue = () => ({
  name: '',
  completed: false,
  order: 0,
  id: getId(),
})
