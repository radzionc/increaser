import { Panel } from '@increaser/ui/ui/Panel/Panel'

import { AppSumoCodeRedemption } from './AppSumoCodeRedemption'
import { FixedWidthContent } from 'components/reusable/fixed-width-content'
import { PageTitle } from 'ui/PageTitle'
import { UserStateOnly } from 'user/state/UserStateOnly'
import { Page } from 'components/Page'

const title = 'AppSumo & Increaser'

export const AppSumoPage: Page = () => {
  return (
    <FixedWidthContent>
      <PageTitle title={title} documentTitle={`🌮 ${title}`} />
      <UserStateOnly>
        <Panel width={380}>
          <AppSumoCodeRedemption />
        </Panel>
      </UserStateOnly>
    </FixedWidthContent>
  )
}
