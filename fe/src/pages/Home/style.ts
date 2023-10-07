import styled from 'styled-components';

import Button from '@components/common/Button';

const Layout = styled.div`
  max-width: 393px;
  height: 853px;
  position: relative;
`;

const GoToTopButton = styled.button`
  position: absolute;
  justify-content: center;

  bottom: 176px;
  right: 24px;

  width: 56px;
  height: 56px;
  padding: 10px;

  border-radius: 56px;
  background-color: #e5e5e5;

  &:hover {
    background-color: ${({ theme }) => theme.colors.accent.background.primary};
  }

  & > svg {
    fill: ${({ theme }) => theme.colors.accent.text.default};
  }
`;

const NewProductButton = styled(Button)`
  position: absolute;

  bottom: 107px;
  right: 24px;
`;

const ProductListLayout = styled.div`
  margin-bottom: 65px;
  height: calc(100vh - 48px - 65px);
  overflow-y: scroll;

  background-color: ${({ theme }) => theme.colors.neutral.background.default};

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.accent.background.primary};
    border-radius: 12px;
  }
`;

export { Layout, GoToTopButton, NewProductButton, ProductListLayout };
