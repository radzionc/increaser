import { OAuthContent } from '@increaser/app/auth/components/OAuthContent'
import { makeAuthPage } from '@increaser/app/layout/makeAuthPage'

export default makeAuthPage(() => <OAuthContent provider={'google'} />)
