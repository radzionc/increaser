import { ComponentProps } from 'react'

import { NavigationItemContainer } from './NavigationItemContainer'
import { NavigationItemContentFrame } from './NavigationItemContentFrame'

export type NavigationItemProps = {
  icon: React.ReactNode
  name: React.ReactNode
  isActive?: boolean
  decoration?: React.ReactNode
} & ComponentProps<typeof NavigationItemContainer>

export const NavigationItem = ({
  icon,
  name,
  isActive = false,
  decoration = null,
  ...rest
}: NavigationItemProps) => {
  return (
    <NavigationItemContainer isActive={isActive} {...rest}>
      <NavigationItemContentFrame>
        {icon}
        {name}
      </NavigationItemContentFrame>
      {decoration}
    </NavigationItemContainer>
  )
}
