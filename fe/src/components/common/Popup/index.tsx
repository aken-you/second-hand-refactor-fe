import Layout from '../Layout';
import * as S from './style';

interface PopupProps {
  text: string;
  children: React.ReactNode;
}

const Popup = ({ text, children }: PopupProps) => {
  return (
    <Layout>
      <S.Popup>
        <span>{text}</span>
        <S.ButtonsLayout>{children}</S.ButtonsLayout>
      </S.Popup>
      <S.Overlay />
    </Layout>
  );
};

export default Popup;
