import { ButtonProps, Button } from '@lib/ui/buttons/Button'
import { ArrowRightIcon } from '@lib/ui/icons/ArrowRightIcon'
import { HStack } from '@lib/ui/css/stack'
import { Text } from '@lib/ui/text'

interface Props
  extends Pick<ButtonProps, 'isLoading' | 'onClick' | 'isDisabled'> {
  text?: string
}

export const ContinueButton = ({ text = 'Continue', ...props }: Props) => {
  return (
    <Button kind="reversed" size="xl" {...props}>
      <HStack alignItems="center" gap={4}>
        <Text>{text}</Text>
        <ArrowRightIcon />
      </HStack>
    </Button>
  )
}
