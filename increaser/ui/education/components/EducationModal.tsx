import { ClosableComponentProps, ComponentWithValueProps } from '@lib/ui/props'
import { ProductToolEducation } from '../ProductToolEducation'
import { Modal } from '@lib/ui/modal'
import { getFormProps } from '@lib/ui/form/utils/getFormProps'
import { CreateFormFooter } from '@lib/ui/form/components/CreateFormFooter'
import { EducationContent } from './EducationContent'

export const EducationModal: React.FC<
  ClosableComponentProps & ComponentWithValueProps<ProductToolEducation>
> = ({ onClose, value }) => {
  return (
    <Modal
      placement="top"
      title={value.title}
      onClose={onClose}
      width={520}
      as="form"
      subTitle={value.subtitle}
      {...getFormProps({ onSubmit: onClose, onClose })}
      footer={<CreateFormFooter submitText="Continue" />}
    >
      <EducationContent>{value.content}</EducationContent>
    </Modal>
  )
}
