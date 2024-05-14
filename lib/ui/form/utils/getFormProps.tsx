import { preventDefault } from '../../utils/preventDefault'
import { KeyboardEvent } from 'react'

type GetFormPropsInput = {
  onClose: () => void
  onSubmit: () => void
  isDisabled?: boolean | string
}

export const getFormProps = ({
  onClose,
  onSubmit,
  isDisabled = false,
}: GetFormPropsInput) => {
  return {
    onKeyDown: (event: KeyboardEvent<HTMLFormElement>) => {
      if (event.key === 'Escape') {
        onClose()
      }
    },
    onSubmit: preventDefault(() => {
      if (isDisabled) return

      onSubmit()
    }),
  }
}
