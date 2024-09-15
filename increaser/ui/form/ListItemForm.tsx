import { ScrollIntoViewOnFirstAppearance } from '@lib/ui/base/ScrollIntoViewOnFirstAppearance'
import { getFormProps } from '@lib/ui/form/utils/getFormProps'
import { Panel } from '@lib/ui/css/panel'
import { ComponentWithChildrenProps } from '@lib/ui/props'

type ListItemFormProps = ComponentWithChildrenProps & {
  onSubmit?: () => void
  isDisabled?: string | boolean
  onClose?: () => void
}

export const ListItemForm = ({
  onSubmit,
  isDisabled,
  onClose,
  children,
}: ListItemFormProps) => {
  return (
    <ScrollIntoViewOnFirstAppearance<HTMLFormElement>
      render={({ ref }) => (
        <Panel
          withSections
          kind="secondary"
          as="form"
          ref={ref}
          style={{ width: '100%' }}
          {...getFormProps({
            onClose,
            isDisabled,
            onSubmit,
          })}
        >
          {children}
        </Panel>
      )}
    />
  )
}
