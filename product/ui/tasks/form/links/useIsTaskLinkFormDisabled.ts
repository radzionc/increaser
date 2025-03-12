import { validate } from '@lib/ui/form/utils/validate'
import { validateUrl } from '@lib/utils/validation/validateUrl'
import { TaskLink } from '@product/entities/Task'

export const useIsTaskLinkFormDisabled = (value: TaskLink) => {
  const errors = validate(value, {
    url: validateUrl,
    name: (name) => {
      if (!name) {
        return 'Please enter a title'
      }
    },
  })

  return Object.values(errors)[0]
}
