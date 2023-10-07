import { forwardRef } from 'react';
import * as S from './style';

interface MainLayoutProps {
  children: React.ReactNode;
  top?: string;
  bottom?: string;
}

const MainLayout = forwardRef(
  ({ children, top = '48px', bottom = '0px' }: MainLayoutProps, ref: React.ForwardedRef<HTMLElement>) => {
    return (
      <S.MainLayout top={top} bottom={bottom} ref={ref}>
        {children}
      </S.MainLayout>
    );
  },
);

MainLayout.displayName = 'MainLayout';

export default MainLayout;
