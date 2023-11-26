import 'styled-components'

import { Theme } from '@increaser/ui/theme/Theme'

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
