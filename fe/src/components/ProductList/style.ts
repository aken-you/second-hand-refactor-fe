import styled from 'styled-components';
import MainLayout from '@components/common/MainLayout';

const ProductList = styled.div`
  height: fit-content;
  padding: 0 16px;
`;

const Main = styled(MainLayout)`
  background-color: ${({ theme }) => theme.colors.neutral.background.default};
`;

const Target = styled.div`
  height: 1px;
`;

const SpinnerLayout = styled.div`
  display: flex;
  justify-content: center;

  padding: 20px 0;
`;

const ProductNotFound = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: ${({ theme }) => theme.fonts.callout.fontSize};
  font-weight: ${({ theme }) => theme.fonts.callout.fontWeight};
  line-height: ${({ theme }) => theme.fonts.callout.lineHeight};
  color: ${({ theme }) => theme.colors.neutral.text.strong};
`;

export { ProductList, Main, Target, SpinnerLayout, ProductNotFound };
