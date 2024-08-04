import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { useProject } from '../hooks/useProject'
import { useProjectFilter } from './ProjectFilterProvider'
import { Button } from '@lib/ui/buttons/Button'
import { HStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { CloseIcon } from '@lib/ui/icons/CloseIcon'

export const ClearProjectFilter = () => {
  const [projectId, setValue] = useProjectFilter()
  const { name, emoji } = shouldBePresent(
    useProject(shouldBePresent(projectId)),
  )

  return (
    <Button size="s" kind="outlined" onClick={() => setValue(null)}>
      <HStack alignItems="center" gap={8}>
        <Text color="contrast">{emoji}</Text>
        <Text>{name}</Text>
        <IconWrapper>
          <CloseIcon />
        </IconWrapper>
      </HStack>
    </Button>
  )
}
