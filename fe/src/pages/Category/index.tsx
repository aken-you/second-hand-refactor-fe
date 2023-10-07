import { Link, useNavigate } from 'react-router-dom';

import { ICON_NAME, PATH, REQUEST_URL } from '@constants/index';

import useFetch, { REQUEST_METHOD, RESPONSE_STATE } from '@hooks/useFetch';

import Icon from '@components/common/Icon';
import MainLayout from '@components/common/MainLayout';
import * as S from './style';

interface Category {
  id: number;
  name: string;
  photoUrl: string;
}

interface CategoriesData {
  categories: Category[];
}

const Category = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('Token');
  const options: RequestInit = {
    method: REQUEST_METHOD.GET,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  };

  const { responseState, data } = useFetch<CategoriesData>({
    url: REQUEST_URL.CATEGORY,
    options,
  });

  return (
    <>
      <S.Header>
        <Link to={PATH.HOME}>
          <S.BackButton>
            <Icon name={ICON_NAME.CHEVRON_LEFT} />
            <span>뒤로</span>
          </S.BackButton>
        </Link>
        <S.HeaderTitle>카테고리</S.HeaderTitle>
        <S.EmptyTag></S.EmptyTag>
      </S.Header>
      <MainLayout>
        {responseState === RESPONSE_STATE.LOADING && <></>}
        {responseState === RESPONSE_STATE.ERROR && <div>error</div>}
        {responseState === RESPONSE_STATE.SUCCESS && (
          <S.CategoryList>
            {data?.categories.map(({ id, name, photoUrl }) => (
              <S.CategoryItem
                key={id}
                onClick={() => navigate(`${PATH.CATEGORY_DETAIL}?id=${id}&name=${name}`)}
              >
                <S.CategoryImg src={photoUrl} alt={name} />
                <span>{name}</span>
              </S.CategoryItem>
            ))}
          </S.CategoryList>
        )}
      </MainLayout>
    </>
  );
};

export default Category;
