import { VStack } from '@lib/ui/layout/Stack'
import { GoalsEducationItem } from './GoalsEducationItem'
import { LinkText } from '@lib/ui/text/LinkText'
import Link from 'next/link'
import { getAppPath } from '../../navigation/app'

const items = [
  {
    title: 'Visualize',
    description: (
      <>
        Describe your perfect life on the{' '}
        <Link href={getAppPath('vision', 'ideas')}>
          <LinkText as="span">Vision page</LinkText>
        </Link>
        . Then, list goals that align with this vision.
      </>
    ),
  },
  {
    title: 'Prioritize',
    description:
      'Identify your top goal from your list and focus on it. Concentrating on one goal increases the chances of success.',
  },
]

export const GoalsEducationItems = () => {
  return (
    <VStack gap={20}>
      {items.map((item, index) => (
        <GoalsEducationItem key={index} index={index} title={item.title}>
          {item.description}
        </GoalsEducationItem>
      ))}
    </VStack>
  )
}
