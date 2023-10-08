import { makeAuthPage } from 'layout/makeAuthPage'
import { ConfirmEmailAuthView } from '@increaser/ui/auth/ConfirmEmailAuthView'

export default makeAuthPage(() => <ConfirmEmailAuthView sender="increaser" />)
