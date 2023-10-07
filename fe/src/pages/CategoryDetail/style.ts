import styled from 'styled-components';

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 45px;

  height: 48px;
  padding: 0 9px;

  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral.border.default};
`;

const HeaderTitle = styled.span`
  font-size: ${({ theme }) => theme.fonts.body.bold.fontSize};
  font-weight: ${({ theme }) => theme.fonts.body.bold.fontWeight};
  line-height: ${({ theme }) => theme.fonts.body.bold.lineHeight};
  color: ${({ theme }) => theme.colors.neutral.text.strong};
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;

  width: 100px;

  font-size: ${({ theme }) => theme.fonts.body.regular.fontSize};
  font-weight: ${({ theme }) => theme.fonts.body.regular.fontWeight};
  line-height: ${({ theme }) => theme.fonts.body.regular.lineHeight};
  color: ${({ theme }) => theme.colors.neutral.text.strong};
`;

const EmptyTag = styled.div`
  width: 100px;
`;

const GoToTopButton = styled.button`
  position: fixed;
  bottom: 18px;
  right: 18px;

  width: 56px;
  height: 56px;

  background-color: ${({ theme }) => theme.colors.accent.background.primary};
  border: 1px solid ${({ theme }) => theme.colors.neutral.border.default};
  border-radius: 56px;

  & > svg {
    fill: ${({ theme }) => theme.colors.accent.text.default};
  }
`;

export { Header, BackButton, HeaderTitle, EmptyTag, GoToTopButton };
