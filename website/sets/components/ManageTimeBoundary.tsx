import { ReactNode } from 'react'
import { getDateFromMinutes } from '@increaser/utils/time/getDateFromMinutes'
import { IconButton } from '@increaser/ui/buttons/IconButton'
import { MinusIcon } from '@increaser/ui/icons/MinusIcon'
import { PlusIcon } from '@increaser/ui/icons/PlusIcon'
import { HStack, VStack } from '@increaser/ui/layout/Stack'
import { Text } from '@increaser/ui/text'
import { EmojiTextPrefix } from 'ui/EmojiTextPrefix'

interface ManageTimeBoundaryProps {
  text: ReactNode
  value: number
  onChange: (value: number) => void
  min: number
  max: number
  emoji: string
}

const incrementInMinutes = 30

export const ManageTimeBoundary = ({
  text,
  value,
  onChange,
  min,
  max,
  emoji,
}: ManageTimeBoundaryProps) => {
  const date = getDateFromMinutes(value)

  const handleChange = (value: number) =>
    onChange(Math.max(min, Math.min(max, value)))

  return (
    <VStack gap={4}>
      <Text color="supporting" weight="bold">
        {text}
      </Text>
      <HStack gap={8} alignItems="center">
        <Text weight="semibold">
          <EmojiTextPrefix size={20} emoji={emoji} />
        </Text>

        <HStack alignItems="center" gap={12}>
          <Text weight="bold">
            {date.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
          <HStack alignItems="center" gap={4}>
            <IconButton
              title="Decrease time"
              onClick={() => handleChange(value - incrementInMinutes)}
              kind="secondary"
              size="m"
              icon={<MinusIcon />}
            />
            <IconButton
              title="Increase time"
              onClick={() => handleChange(value + incrementInMinutes)}
              kind="secondary"
              size="m"
              icon={<PlusIcon />}
            />
          </HStack>
        </HStack>
      </HStack>
    </VStack>
  )
}
