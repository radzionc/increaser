import { EnhancedProject } from '@increaser/ui/projects/EnhancedProject'
import { HStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import styled from 'styled-components'
import { formatDuration } from '@lib/utils/time/formatDuration'
import { round } from '@lib/ui/css/round'
import { Panel } from '@lib/ui/panel/Panel'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { ProjectGoalShyIndicator } from './ProjectGoalShyIndicator'
import { TrashBinIcon } from '@lib/ui/icons/TrashBinIcon'
import { UnstyledButton } from '@lib/ui/buttons/UnstyledButton'
import { centerContent } from '@lib/ui/css/centerContent'
import { transition } from '@lib/ui/css/transition'
import { getHoverVariant } from '@lib/ui/theme/getHoverVariant'
import { getColor } from '@lib/ui/theme/getters'
import { EditIcon } from '@lib/ui/icons/EditIcon'
import { useUpdateProjectMutation } from '../api/useUpdateProjectMutation'
import { Opener } from '@lib/ui/base/Opener'
import { ManageProjectBudget } from './ManageProjectBudget'

type WeeklyGoalItemProps = {
  value: EnhancedProject
}

const Identifier = styled.div`
  ${sameDimensions(8)}
  ${round};
`

const Container = styled(Panel)`
  font-size: 14px;
`

const PanelButton = styled(UnstyledButton)`
  height: 100%;
  font-size: 20px;
  ${centerContent};
  ${transition};
  &:hover {
    background: ${getHoverVariant('foreground')};
    color: ${getColor('contrast')};
  }
`

export const ProjectBudgetItem = ({ value }: WeeklyGoalItemProps) => {
  const { mutate } = useUpdateProjectMutation()

  return (
    <Opener
      renderOpener={({ onOpen, isOpen }) =>
        isOpen ? null : (
          <Container withSections direction="row">
            <HStack
              fullWidth
              alignItems="center"
              justifyContent="space-between"
            >
              <HStack alignItems="center" gap={8}>
                <Identifier
                  style={{ background: value.hslaColor.toCssValue() }}
                />
                <Text color="regular" cropped weight="semibold">
                  {value.name}
                </Text>
              </HStack>
              <Text weight="bold" color="contrast">
                {formatDuration(value.allocatedMinutesPerWeek, 'min', {
                  kind: 'long',
                  minUnit: 'h',
                  maxUnit: 'h',
                })}{' '}
                {value.goal && <ProjectGoalShyIndicator value={value.goal} />}
              </Text>
            </HStack>
            <PanelButton onClick={onOpen}>
              <EditIcon />
            </PanelButton>
            <PanelButton
              onClick={() => {
                mutate({
                  id: value.id,
                  fields: {
                    allocatedMinutesPerWeek: 0,
                    goal: null,
                  },
                })
              }}
            >
              <TrashBinIcon />
            </PanelButton>
          </Container>
        )
      }
      renderContent={({ onClose }) => (
        <ManageProjectBudget onFinish={onClose} project={value} />
      )}
    />
  )
}
