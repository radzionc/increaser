import { LearnMorePrompt } from '@lib/ui/info/LearnMorePrompt'
import { isEmpty } from '@lib/utils/array/isEmpty'
import { StartBreak } from '@product/ui/break/StartBreak'
import { getAppPath } from '@product/ui/navigation/app'
import Link from 'next/link'

import { useTodaySets } from '../../sets/hooks/useTodaySets'

export const HomePageTitleAction = () => {
  const todaySets = useTodaySets()

  if (isEmpty(todaySets)) {
    return (
      <Link href={getAppPath('info', 'focus')}>
        <LearnMorePrompt as="div" />
      </Link>
    )
  }

  return <StartBreak />
}
