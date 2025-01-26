import { getAppPath } from '@increaser/ui/navigation/app'
import { LearnMorePrompt } from '@lib/ui/info/LearnMorePrompt'
import Link from 'next/link'
import { useTodaySets } from '../../sets/hooks/useTodaySets'
import { isEmpty } from '@lib/utils/array/isEmpty'

export const HomePageTitleAction = () => {
  const todaySets = useTodaySets()

  if (isEmpty(todaySets)) {
    return (
      <Link href={getAppPath('info', 'focus')}>
        <LearnMorePrompt as="div" />
      </Link>
    )
  }

  return null
}
