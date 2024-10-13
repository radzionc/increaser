import { getAppPath } from '@increaser/ui/navigation/app'
import { AppLink } from '../navigation/AppLink'
import { CtaButton } from '@lib/ui/buttons/CtaButton'
import { ComponentWithChildrenProps } from '@lib/ui/props'

export const PrimaryCallToAction = ({
  children = 'Start now',
}: Partial<ComponentWithChildrenProps>) => (
  <AppLink to={getAppPath('signUp')}>
    <CtaButton as="div">{children}</CtaButton>
  </AppLink>
)
