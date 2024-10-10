import { ComponentWithValueProps } from '@lib/ui/props'
import { ProductToolEducation } from '../ProductToolEducation'
import { Opener } from '@lib/ui/base/Opener'
import { InfoIcon } from '@lib/ui/icons/InfoIcon'
import { Modal } from '@lib/ui/modal'
import { getFormProps } from '@lib/ui/form/utils/getFormProps'
import { CreateFormFooter } from '@lib/ui/form/components/CreateFormFooter'
import styled from 'styled-components'
import { getColor } from '@lib/ui/theme/getters'
import { UnstyledButton } from '@lib/ui/buttons/UnstyledButton'
import { round } from '@lib/ui/css/round'
import { hStack } from '@lib/ui/css/stack'
import { horizontalPadding } from '@lib/ui/css/horizontalPadding'

const Content = styled.div`
  line-height: 1.5;

  h3 {
    font-weight: 700;
    font-size: 16px;
    color: ${getColor('contrast')};
    margin-bottom: 8px;

    &:not(:first-child) {
      margin-top: 24px;
    }
  }

  strong {
    font-weight: 700;
    font-size: 14px;
    color: ${getColor('contrast')};
  }

  ol,
  ul {
    padding-left: 16px;
  }

  li {
    &:not(:first-child) {
      margin-top: 8px;
    }
  }
`

const Prompt = styled(UnstyledButton)`
  ${round};
  background: ${getColor('mist')};
  color: ${getColor('text')};
  font-weight: 500;
  height: 40px;
  ${horizontalPadding(16)};
  padding-left: 11px;
  font-size: 14px;

  border: 1px solid ${getColor('mist')};

  svg {
    font-size: 18px;
    color: ${getColor('contrast')};
  }

  ${hStack({
    alignItems: 'center',
    gap: 8,
  })};

  &:hover {
    background: ${getColor('mistExtra')};
  }
`

export const ProductToolEducationPrompt = ({
  value,
}: ComponentWithValueProps<ProductToolEducation>) => {
  return (
    <Opener
      renderOpener={({ onOpen }) => (
        <Prompt onClick={onOpen}>
          <InfoIcon />
          Learn more
        </Prompt>
      )}
      renderContent={({ onClose }) => (
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
          <Content>{value.content}</Content>
        </Modal>
      )}
    />
  )
}
