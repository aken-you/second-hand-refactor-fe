import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { ICON_NAME, PATH, REQUEST_URL } from '@constants/index';

import useFetch, { REQUEST_METHOD, RESPONSE_STATE } from '@hooks/useFetch';

import Icon from '@components/common/Icon';
import Header from '@components/common/Header';
import ProductList from '@components/ProductList';
import TabBar from '@components/TabBar';
import * as S from './style';

interface Region {
  id: number;
  name: string;
}

interface RegionsData {
  regions: Region[];
}

const Home = () => {
  const [userRegions, setUserRegions] = useState<Region[]>([]);
  const listRef = useRef<HTMLElement>(null);
  const token = localStorage.getItem('Token');
  const SELECTED_REGION_IDX = 0;

  const {
    responseState,
    data: regionsData,
    error,
  } = useFetch<RegionsData>({
    url: REQUEST_URL.USER_REGIONS,
    options: {
      method: REQUEST_METHOD.GET,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    },
  });

  const handleGoToTopBtnClick = () => {
    listRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (!regionsData) return;

    // * User가 비회원일 경우 userRegions에 역삼동에 관한 정보만 저장
    setUserRegions(regionsData.regions);
  }, [regionsData]);

  if (responseState === RESPONSE_STATE.ERROR) throw error;

  return (
    <>
      {userRegions.length > 0 && (
        <>
          <Header type="home" regions={userRegions} changeUserRegions={setUserRegions} />
          <S.Main top={'48px'} bottom={'65px'} ref={listRef}>
            <ProductList regionId={userRegions[SELECTED_REGION_IDX].id} />
          </S.Main>
        </>
      )}

      <TabBar activeTab="home" />

      <S.GoToTopButton onClick={handleGoToTopBtnClick}>
        <Icon name={ICON_NAME.ARROW_UP} />
      </S.GoToTopButton>

      <Link to={PATH.NEW_PRODUCT}>
        <S.NewProductButton buttonType="circle">
          <Icon name={ICON_NAME.PLUS} />
        </S.NewProductButton>
      </Link>
    </>
  );
};

export default Home;
