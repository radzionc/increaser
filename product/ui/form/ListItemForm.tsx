import { ScrollIntoViewOnFirstAppearance } from '@lib/ui/base/ScrollIntoViewOnFirstAppearance'
import { Panel } from '@lib/ui/css/panel'
import { getFormProps } from '@lib/ui/form/utils/getFormProps'
import { ChildrenProp, UiProps } from '@lib/ui/props'

type ListItemFormProps = ChildrenProp & {
  onSubmit?: () => void
  isDisabled?: string | boolean
  onClose?: () => void
} & UiProps

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
