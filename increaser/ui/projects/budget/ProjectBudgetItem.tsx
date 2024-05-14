import { EnhancedProject } from '@increaser/ui/projects/EnhancedProject'
import { HStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import styled from 'styled-components'
import { formatDuration } from '@lib/utils/time/formatDuration'
import { Panel } from '@lib/ui/panel/Panel'
import { ProjectGoalShyIndicator } from './ProjectGoalShyIndicator'
import { TrashBinIcon } from '@lib/ui/icons/TrashBinIcon'
import { centerContent } from '@lib/ui/css/centerContent'
import { transition } from '@lib/ui/css/transition'
import { getHoverVariant } from '@lib/ui/theme/getHoverVariant'
import { getColor } from '@lib/ui/theme/getters'
import { EditIcon } from '@lib/ui/icons/EditIcon'
import { useUpdateProjectMutation } from '@increaser/ui/projects/api/useUpdateProjectMutation'
import { Opener } from '@lib/ui/base/Opener'
import { ManageProjectBudget } from './ManageProjectBudget'
import { interactive } from '@lib/ui/css/interactive'
import { cropText } from '@lib/ui/css/cropText'

type WeeklyGoalItemProps = {
  value: EnhancedProject
}

const Container = styled(Panel)`
  font-size: 14px;
`

const PanelButton = styled.div`
  ${interactive};
  font-size: 18px;
  ${centerContent};
  ${transition};
  &:hover {
    background: ${getHoverVariant('mist')};
    color: ${getColor('contrast')};
  }
`

const Content = styled(HStack)`
  ${cropText};
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
              gap={8}
              style={{ overflow: 'hidden' }}
            >
              <Content alignItems="center" gap={8}>
                {<ProjectGoalShyIndicator value={value.goal ?? null} />}

                <Text color="contrast" cropped weight="semibold">
                  {value.name}
                </Text>
              </Content>
              <HStack alignItems="center" gap={4}>
                <Text nowrap weight="bold" color="contrast">
                  {formatDuration(value.allocatedMinutesPerWeek, 'min', {
                    kind: 'long',
                    minUnit: 'h',
                    maxUnit: 'h',
                  })}{' '}
                </Text>
              </HStack>
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
