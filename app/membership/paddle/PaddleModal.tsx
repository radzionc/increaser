import { ThemeProvider } from 'styled-components'
import { Modal, ModalProps } from '@increaser/ui/ui/Modal'
import { lightTheme } from '@increaser/ui/ui/theme/lightTheme'

export const PaddleModal = ({ width = 400, ...props }: ModalProps) => {
  return (
    <ThemeProvider theme={lightTheme}>
      <Modal placement="top" width={width} {...props} />
    </ThemeProvider>
  )
}
