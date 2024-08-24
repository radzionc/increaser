import { ComponentWithChildrenProps } from '@lib/ui/props'
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react'
import { createPortal } from 'react-dom'

type ContextState = {
  value: HTMLDivElement | null
  setValue: Dispatch<SetStateAction<HTMLDivElement | null>>
}

const Context = createContext<ContextState>({
  value: null,
  setValue: () => {},
})

export const PageHeaderControlsAreaProvider = ({
  children,
}: ComponentWithChildrenProps) => {
  const [value, setValue] = useState<HTMLDivElement | null>(null)

  return (
    <Context.Provider value={{ value, setValue }}>{children}</Context.Provider>
  )
}

export const useSetPageHeaderControlsArea = () => {
  const { setValue } = useContext(Context)

  return setValue
}

export const PageHeaderControlsArea = ({
  children,
}: ComponentWithChildrenProps) => {
  const { value } = useContext(Context)

  if (!value) return null

  return createPortal(children, value)
}
