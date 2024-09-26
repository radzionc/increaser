import { useFloatingOptions } from '@lib/ui/floating/useFloatingOptions'
import { useActiveProjects } from '../../hooks/useActiveProjects'
import { useProject } from '../../hooks/useProject'
import { useProjectFilter } from './state/projectFilter'
import { HStack, vStack, VStack } from '@lib/ui/css/stack'
import { Text } from '@lib/ui/text'
import { FloatingFocusManager } from '@floating-ui/react'
import { TitledFloatingOptionsContainer } from '@lib/ui/floating/TitledFloatingOptionsContainer'
import { OptionItem } from '@lib/ui/select/OptionItem'
import { OptionContent } from '@lib/ui/select/OptionContent'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { ListFilterIcon } from '@lib/ui/icons/ListFilterIcon'
import { Button } from '@lib/ui/buttons/Button'
import { ComponentWithActiveState } from '@lib/ui/props'
import { getColor } from '@lib/ui/theme/getters'
import styled, { css } from 'styled-components'
import { UnstyledButton } from '@lib/ui/buttons/UnstyledButton'
import { WithSecondaryAction } from '@lib/ui/buttons/WithSecondaryAction'
import { CloseIcon } from '@lib/ui/icons/CloseIcon'
import { EmojiTextPrefix } from '@lib/ui/text/EmojiTextPrefix'

const Opener = styled(Button)<ComponentWithActiveState>`
  border: 1px solid transparent;
  ${({ isActive }) =>
    isActive &&
    css`
      border-color: ${getColor('contrast')};
    `}
`

const Content = styled(UnstyledButton)<ComponentWithActiveState>`
  ${vStack({
    justifyContent: 'center',
  })}

  ${({ isActive }) =>
    isActive &&
    css`
      color: ${getColor('contrast')};
    `}
`

export const ManageProjectFilter = () => {
  const [projectId, setValue] = useProjectFilter()
  const project = useProject(projectId)
  const items = useActiveProjects()

  const {
    getReferenceProps,
    getFloatingProps,
    getOptionProps,
    isOpen,
    setIsOpen,
    activeIndex,
    context,
  } = useFloatingOptions({
    floatingOptionsWidthSameAsOpener: false,
    selectedIndex: null,
    strategy: 'fixed',
    placement: 'bottom-end',
    options: items.map(({ name }) => name),
  })

  return (
    <>
      {project ? (
        <WithSecondaryAction height={40}>
          <Content isActive={isOpen} {...getReferenceProps()}>
            <Text>
              <EmojiTextPrefix emoji={project.emoji} />
              {project.name}
            </Text>
          </Content>
          <UnstyledButton
            onClick={() => {
              setValue(null)
            }}
            title="Remove filter"
          >
            <CloseIcon />
          </UnstyledButton>
        </WithSecondaryAction>
      ) : (
        <Opener
          kind="ghost"
          size="s"
          isActive={isOpen}
          {...getReferenceProps()}
        >
          <HStack alignItems="center" gap={8}>
            <IconWrapper>
              <ListFilterIcon />
            </IconWrapper>
            Filter
          </HStack>
        </Opener>
      )}
      {isOpen && (
        <FloatingFocusManager context={context} modal returnFocus>
          <TitledFloatingOptionsContainer
            title="Filter by project"
            {...getFloatingProps()}
          >
            <VStack>
              {items.map(({ emoji, name, id }, index) => {
                return (
                  <OptionItem
                    key={id}
                    isActive={activeIndex === index}
                    {...getOptionProps({
                      index,
                      onSelect: () => {
                        setValue(id)
                        setIsOpen(false)
                      },
                    })}
                  >
                    <OptionContent>
                      <HStack alignItems="center" gap={8}>
                        <Text color="contrast">{emoji}</Text>
                        <Text>{name}</Text>
                      </HStack>
                    </OptionContent>
                  </OptionItem>
                )
              })}
            </VStack>
          </TitledFloatingOptionsContainer>
        </FloatingFocusManager>
      )}
    </>
  )
}
