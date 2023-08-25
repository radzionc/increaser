import { NextPage } from 'next'
import { ReactNode } from 'react'

type GetLayout = (page: ReactNode) => ReactNode

export type Page<P = unknown> = NextPage<P> & {
  getLayout?: GetLayout
}
