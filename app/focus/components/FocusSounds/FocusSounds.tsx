import { useState } from 'react'
import styled, { css } from 'styled-components'
import { transition } from '@increaser/ui/css/transition'
import { Button } from '@increaser/ui/buttons/Button'
import { ArrowLeftIcon } from '@increaser/ui/icons/ArrowLeftIcon'
import { PlusIcon } from '@increaser/ui/icons/PlusIcon'
import { Panel } from '@increaser/ui/panel/Panel'
import { HStack } from '@increaser/ui/layout/Stack'
import { Switch } from '@increaser/ui/inputs/Switch/Switch'

import { AddSound } from './AddSound'
import { FocusSoundsList } from './FocusSoundsList'
import { useFocusSounds } from './useFocusSounds'
import { Match } from '@increaser/ui/base/Match'
import { verticalPadding } from '@increaser/ui/css/verticalPadding'

const Container = styled(Panel)<{ isActive: boolean }>`
  ${transition};
  height: 100%;

  ${({ isActive }) =>
    !isActive &&
    css`
      box-shadow: none;
      border-color: transparent;
      > * {
        background: transparent;
      }
    `}
`

const FocusModeSwitch = styled(Switch)`
  ${verticalPadding(4)}
  padding: 20px;
  padding-right: 0;
`

const ControlArea = styled(HStack)`
  padding-left: 0;
  padding-top: 0;
  padding-bottom: 0;
`

const focusSoundsViews = ['player', 'add'] as const
type FocusSoundsView = (typeof focusSoundsViews)[number]

export const FocusSounds = () => {
  const { isEnabled, updateIsEnabled, updateIsPlaying } = useFocusSounds()
  const [view, setView] = useState<FocusSoundsView>('player')

  return (
    <Container padding={16} kind="secondary" withSections isActive={isEnabled}>
      <ControlArea alignItems="center" gap={20} justifyContent="space-between">
        <FocusModeSwitch
          value={isEnabled}
          onChange={updateIsEnabled}
          label="Focus sounds"
        />
        {isEnabled && (
          <Match
            value={view}
            player={() => (
              <Button
                onClick={() => {
                  updateIsPlaying(false)
                  setView('add')
                }}
                size="s"
                kind="secondary"
              >
                <HStack alignItems="center" gap={8}>
                  <PlusIcon /> Add
                </HStack>
              </Button>
            )}
            add={() => (
              <Button
                onClick={() => setView('player')}
                size="s"
                kind="secondary"
              >
                <HStack alignItems="center" gap={8}>
                  <ArrowLeftIcon /> Back
                </HStack>
              </Button>
            )}
          />
        )}
      </ControlArea>
      {isEnabled && (
        <Match
          value={view}
          player={() => <FocusSoundsList />}
          add={() => (
            <AddSound
              onFinish={() => {
                setView('player')
              }}
            />
          )}
        />
      )}
    </Container>
  )
}
