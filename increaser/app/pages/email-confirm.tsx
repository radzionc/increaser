import { makeAuthPage } from '@increaser/app/layout/makeAuthPage'
import { ConfirmEmailAuthView } from '@lib/ui/auth/ConfirmEmailAuthView'

export default makeAuthPage(() => <ConfirmEmailAuthView sender="increaser" />)
