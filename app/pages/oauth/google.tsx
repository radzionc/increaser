import { OAuthContent } from 'auth/components/OAuthContent'
import { makeAuthPage } from 'layout/makeAuthPage'

export default makeAuthPage(() => <OAuthContent provider={'google'} />)
