import { getAppPath } from '@increaser/ui/navigation/app'
import { AppLink } from '../navigation/AppLink'
import { CtaButton } from '@lib/ui/buttons/CtaButton'
import { ChildrenProp } from '@lib/ui/props'

export const PrimaryCallToAction = ({
  children = 'Start now',
}: Partial<ChildrenProp>) => (
  <AppLink to={getAppPath('signUp')}>
    <CtaButton as="div">{children}</CtaButton>
  </AppLink>
)
