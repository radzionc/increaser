import { VStack } from '@lib/ui/css/stack'
import { GoalsEducationItem } from './GoalsEducationItem'
import { LinkText } from '@lib/ui/text/LinkText'
import Link from 'next/link'
import { getAppPath } from '../../navigation/app'
import styled from 'styled-components'

const items = [
  {
    title: 'Know What You Want',
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
  {
    title: 'Aim High',
    description:
      'Choose a goal that is ambitious and slightly out of reach. Pursuing a challenging goal can drive greater growth and achievement.',
  },
  {
    title: 'Be Specific',
    description:
      'Set a specific goal with clear criteria. A well-defined goal is easier to achieve and measure progress.',
  },
  {
    title: 'Action Plan',
    description:
      'Create a plan with specific actions and timeframes. Define how much time per week you will spend on the goal and on which specific days.',
  },
  {
    title: 'Keep It Private',
    description:
      'Avoid telling others about your goal, especially before you start working on it. Keeping it private can help maintain motivation and focus.',
  },
  {
    title: 'Set a Deadline',
    description:
      'Assign a deadline to your goal, preferably within a quarter. Deadlines create urgency and help maintain focus.',
  },
  {
    title: 'Visualize Outcomes',
    description:
      'Spend 1-3 minutes visualizing what success will look and feel like. If unmotivated, visualize the consequences of failure.',
  },
]

const Container = styled(VStack)`
  gap: 20px;
  width: 100%;
`

export const GoalsEducationItems = () => {
  return (
    <Container>
      {items.map((item, index) => (
        <GoalsEducationItem key={index} index={index} title={item.title}>
          {item.description}
        </GoalsEducationItem>
      ))}
    </Container>
  )
}
