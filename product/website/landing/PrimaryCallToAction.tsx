import { CtaButton } from '@lib/ui/buttons/CtaButton'
import { ChildrenProp } from '@lib/ui/props'
import { getAppPath } from '@product/ui/navigation/app'

import { AppLink } from '../navigation/AppLink'

export const PrimaryCallToAction = ({
  children = 'Start now',
}: Partial<ChildrenProp>) => (
  <AppLink to={getAppPath('signUp')}>
    <CtaButton as="div">{children}</CtaButton>
  </AppLink>
)
