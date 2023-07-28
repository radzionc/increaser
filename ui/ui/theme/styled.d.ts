import 'styled-components'

import { Theme } from '@increaser/ui/ui/theme/Theme'

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
