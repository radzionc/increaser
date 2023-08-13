import { Button } from '@increaser/ui/ui/buttons/Button'
import Link from 'next/link'
import { Path } from 'router/Path'
interface Props {
  text?: string
}

export const CTA = ({ text = 'Start now' }: Props) => {
  return (
    <Link href={Path.SignUp}>
      <Button as="div" kind="reversed" size="xl">
        {text}
      </Button>
    </Link>
  )
}
