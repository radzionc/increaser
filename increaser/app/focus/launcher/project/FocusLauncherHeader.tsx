import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { takeWholeSpace } from '@lib/ui/css/takeWholeSpace'
import { HStack } from '@lib/ui/layout/Stack'
import { panelDefaultPadding } from '@lib/ui/panel/Panel'
import { InputProps } from '@lib/ui/props'
import styled from 'styled-components'
import { useFocusLauncher } from '../state/useFocusLauncher'
import { Text } from '@lib/ui/text'
import { EmojiTextPrefix } from '@lib/ui/text/EmojiTextPrefix'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { FocusIconButton } from '../../components/FocusSetWidget/FocusIconButton'
import { CollapsableStateIndicator } from '@lib/ui/layout/CollapsableStateIndicator'
import { getColor } from '@lib/ui/theme/getters'
import { CloseIcon } from '@lib/ui/icons/CloseIcon'
import { interactive } from '@lib/ui/css/interactive'

const Container = styled(HStack)`
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 60px;
  position: relative;
`

const Indicator = styled(FocusIconButton)``

const Content = styled(HStack)`
  align-items: center;
  justify-content: space-between;

  ${interactive};
  ${takeWholeSpace};

  ${horizontalPadding(panelDefaultPadding)};

  &:hover ${Indicator} {
    background: ${getColor('mist')};
    color: ${getColor('contrast')};
  }
`

const RemoveButtonPosition = styled.div`
  position: absolute;
  right: 60px;
`

export const FocusLauncherHeader = ({
  value,
  onChange,
}: InputProps<boolean>) => {
  const [{ projectId }, setState] = useFocusLauncher()
  const { projects } = useAssertUserState()

  return (
    <Container>
      <Content onClick={() => onChange(!value)}>
        <Text>
          {projectId ? (
            <>
              <EmojiTextPrefix emoji={projects[projectId].emoji} />{' '}
              {projects[projectId].name}
            </>
          ) : (
            'Select a project ...'
          )}
        </Text>
        <Indicator
          forwardedAs="div"
          kind="secondary"
          icon={<CollapsableStateIndicator isOpen={value} />}
          title={value ? 'Close' : 'Open'}
        />
      </Content>
      {projectId && (
        <RemoveButtonPosition>
          <FocusIconButton
            kind="secondary"
            title="Clear"
            icon={<CloseIcon />}
            onClick={() => {
              setState((state) => ({ ...state, projectId: null }))
            }}
          />
        </RemoveButtonPosition>
      )}
    </Container>
  )
}
