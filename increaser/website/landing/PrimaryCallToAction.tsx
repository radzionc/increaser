import { AppPath } from '@increaser/ui/navigation/AppPath'
import { AppLink } from '../navigation/AppLink'
import { Button, ButtonProps } from '@lib/ui/buttons/Button'

type PrimaryCallToActionProps = Partial<ButtonProps>

export const PrimaryCallToAction = ({
  children = 'Start now',
  size = 'xl',
  kind = 'primary',
  ...rest
}: PrimaryCallToActionProps) => (
  <AppLink to={AppPath.SignUp}>
    <Button as="div" kind={kind} size={size} {...rest}>
      {children}
    </Button>
  </AppLink>
)
