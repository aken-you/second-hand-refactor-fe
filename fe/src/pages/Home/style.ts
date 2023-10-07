import styled from 'styled-components';

import Button from '@components/common/Button';
import MainLayout from '@components/common/MainLayout';

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

const Main = styled(MainLayout)`
  background-color: ${({ theme }) => theme.colors.neutral.background.default};
`;

export { Layout, GoToTopButton, NewProductButton, Main };
