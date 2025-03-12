import { HSLA } from '@lib/ui/colors/HSLA'
import { Interval } from '@lib/utils/interval/Interval'

export type FocusBreakdownItemInfo = {
  color: HSLA
  name: string
  kind: 'primary' | 'secondary'
  interval: Interval
}
