import { ThemeProvider } from 'styled-components'
import { Modal, ModalProps } from '@increaser/ui/ui/Modal'
import { lightTheme } from '@increaser/ui/ui/theme/lightTheme'

interface Props extends Omit<ModalProps, 'width'> {
  width?: number
}

export const PaddleModal = ({ width = 400, ...props }: Props) => {
  return (
    <ThemeProvider theme={lightTheme}>
      <Modal placement="top" width={width} {...props} />
    </ThemeProvider>
  )
}
