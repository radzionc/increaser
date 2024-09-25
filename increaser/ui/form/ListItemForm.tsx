import { ScrollIntoViewOnFirstAppearance } from '@lib/ui/base/ScrollIntoViewOnFirstAppearance'
import { getFormProps } from '@lib/ui/form/utils/getFormProps'
import { Panel } from '@lib/ui/css/panel'
import { ComponentWithChildrenProps, UIComponentProps } from '@lib/ui/props'

type ListItemFormProps = ComponentWithChildrenProps & {
  onSubmit?: () => void
  isDisabled?: string | boolean
  onClose?: () => void
} & UIComponentProps

export const ListItemForm = ({
  onSubmit,
  isDisabled,
  onClose,
  children,
  className,
  style = {},
}: ListItemFormProps) => {
  return (
    <ScrollIntoViewOnFirstAppearance<HTMLFormElement>
      render={({ ref }) => (
        <Panel
          withSections
          kind="secondary"
          as="form"
          ref={ref}
          style={{ width: '100%', ...style }}
          className={className}
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
