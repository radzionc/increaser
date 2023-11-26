import { ButtonProps, Button } from '@increaser/ui/buttons/Button'
import { ArrowRightIcon } from '@increaser/ui/icons/ArrowRightIcon'
import { HStack } from '@increaser/ui/layout/Stack'
import { Text } from '@increaser/ui/text'

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
