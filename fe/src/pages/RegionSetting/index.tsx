import { useCallback } from 'react';
import { Link } from 'react-router-dom';

import { ICON_NAME, PATH, REQUEST_URL } from '@constants/index';
import { getRegion } from '@utils/index';

import useFetch, { REQUEST_METHOD } from '@hooks/useFetch';

import Icon from '@components/common/Icon';
import Button from '@components/common/Button';
import * as S from './style';

interface Region {
  id: number;
  name: string;
}

interface RegionsData {
  regions: Region[];
}

const RegionSetting = () => {
  const token = localStorage.getItem('Token');
  const options: RequestInit = {
    method: REQUEST_METHOD.GET,
    headers: {},
  };

  if (token) options.headers = { ...options.headers, Authorization: `Bearer ${token}` };

  const { data } = useFetch<RegionsData>({
    url: REQUEST_URL.USER_REGIONS,
    options,
  });

  // * data.regions의 첫 번째 요소 === 사용자가 선택한 기본 동네
  const validateSelectedRegion = useCallback((idx: number) => idx === 0, []);

  return (
    <>
      <S.Header>
        <Link to={PATH.HOME}>
          <S.CloseButton>닫기</S.CloseButton>
        </Link>
        <S.HeaderTitle>동네 설정</S.HeaderTitle>
        <S.EmptyTag />
      </S.Header>

      <S.RegionCountLimitMessage>
        <span>지역은 최소 1개,</span>
        <span>최대 2개까지 설정 가능해요.</span>
      </S.RegionCountLimitMessage>

      <S.RegionButtonsLayout>
        {data?.regions.map(({ id, name }, idx) => (
          <Button
            key={id}
            buttonType="rectangle"
            buttonState={validateSelectedRegion(idx) ? 'active' : 'default'}
          >
            <span>{getRegion(name)}</span>
            <Icon name={ICON_NAME.MULTIPLY} />
          </Button>
        ))}

        <Button buttonType="rectangle" buttonState="default">
          <Icon name={ICON_NAME.PLUS} />
        </Button>
      </S.RegionButtonsLayout>
    </>
  );
};

export default RegionSetting;
