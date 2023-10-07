import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { REQUEST_URL } from '@constants/requestUrl';

import useFetch, { REQUEST_METHOD, RESPONSE_STATE } from '@hooks/useFetch';
import { useUserContext } from '@context/userContext';

import Loading from '@components/Loading';
import TabBar from '@components/TabBar';
import * as S from './style';

interface TokenData {
  token: string;
}

const LoginLoading = () => {
  const { login } = useUserContext();
  const navigate = useNavigate();
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const codeParam = urlParams.get('code');

  const { responseState, data } = useFetch<TokenData>({
    url: `${REQUEST_URL.OAUTH}?code=${codeParam}`,
    options: { method: REQUEST_METHOD.GET },
  });

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('Token');

    if (isLoggedIn) navigate('/');

    if (responseState !== RESPONSE_STATE.SUCCESS || !data) return;

    const { token } = data;

    if (token) {
      login(token);
    }

    navigate('/');
  }, [responseState, data]);

  return (
    <>
      <S.LoadingLayout>
        <Loading text="로그인 중입니다." />
        <TabBar activeTab="myAccount" />
      </S.LoadingLayout>
    </>
  );
};

export default LoginLoading;
