import styled from 'styled-components';

const MainLayout = styled.main<{ top?: string; bottom?: string }>`
  height: ${({ top, bottom }) => `calc(100vh - ${top} - ${bottom})`};
  margin-bottom: ${({ bottom }) => bottom};
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.accent.background.primary};
    border-radius: 12px;
  }
`;

export { MainLayout };
