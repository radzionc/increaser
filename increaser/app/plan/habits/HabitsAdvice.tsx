import { Text } from '@lib/ui/text'
import { VStack } from '@lib/ui/layout/Stack'
import { useState } from 'react'
import { TextButton } from '@lib/ui/buttons/TextButton'

const advice: Record<string, string> = {
  'Make It Obvious':
    'Place visual cues where you can easily see them to remind yourself of your habits.',
  'Make It Attractive':
    'Link your habits with activities you enjoy to make them more appealing.',
  'Make It Easy':
    'Break down your habits into small, manageable steps to ensure they’re easy to start.',
  'Make It Satisfying':
    'Reward yourself for completing your habits to reinforce the behavior.',
  'Make It a Part of Your Identity':
    'Think of yourself as the type of person who embodies the habit you want to form, reinforcing it as part of your self-image.',
  'Use Habit Stacking':
    'Pair a new habit with an existing habit to create a strong connection and make it easier to remember and perform.',
}

export const HabitsAdvice = () => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <VStack gap={20}>
      <Text>
        No worries! Just focus on getting back on track today. The two-days rule
        is key because it keeps your momentum going and helps you build strong,
        lasting routines. Missing one day is okay, but avoiding two-day gaps is
        crucial for staying on track. You've got this!{' '}
        {isExpanded ? (
          <TextButton as="span" onClick={() => setIsExpanded(false)}>
            Read less
          </TextButton>
        ) : (
          <>
            <TextButton as="span" onClick={() => setIsExpanded(true)}>
              Read more
            </TextButton>{' '}
            for advice on staying consistent today.
          </>
        )}
      </Text>
      {isExpanded && (
        <VStack gap={8}>
          {Object.entries(advice).map(([title, description], index) => (
            <Text key={title}>
              <Text weight="semibold" as="span" color="regular">
                {index + 1}. {title}:
              </Text>{' '}
              {description}
            </Text>
          ))}
        </VStack>
      )}
    </VStack>
  )
}
