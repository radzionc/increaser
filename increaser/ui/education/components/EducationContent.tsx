import { getColor } from '@lib/ui/theme/getters'
import styled from 'styled-components'

export const EducationContent = styled.div`
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

  p {
    &:not(:last-child) {
      margin-bottom: 8px;
    }
  }

  li {
    &:not(:first-child) {
      margin-top: 8px;
    }
  }
`
