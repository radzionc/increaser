import { ThemeProvider } from 'styled-components'
import { Modal, ModalProps } from '@increaser/ui/modal'
import { lightTheme } from '@increaser/ui/ui/theme/lightTheme'

export const PaddleModal = (props: ModalProps) => {
  return (
    <ThemeProvider theme={lightTheme}>
      <Modal placement="top" {...props} />
    </ThemeProvider>
  )
}
