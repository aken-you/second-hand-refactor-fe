import { forwardRef, useCallback, useEffect, useState } from 'react';
import { REQUEST_URL } from '@constants/requestUrl';

import { REQUEST_METHOD } from '@hooks/useFetch';
import useIntersectionObserver from '@hooks/useIntersectionObserver';
import useForwardRef from '@hooks/useForwardRef';

import Spinner from '@components/common/Spinner';
import ProductListItem, { ProductListItemProps } from '@components/ProductListItem';
import Loading from '@components/Loading';
import * as S from './style';

interface PostsData {
  posts: { content: ProductListItemProps[]; last: boolean };
}

interface ProductListProps {
  regionId: number;
  categoryId?: number;
}

const ProductList = forwardRef<HTMLElement, ProductListProps>(({ regionId, categoryId }, ref) => {
  const [items, setItems] = useState<ProductListItemProps[]>([]);
  const [isLast, setIsLast] = useState<boolean>(false);

  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [pageNum, setPageNum] = useState<number>(0);
  const [err, setErr] = useState<Error>();

  const listRef = useForwardRef<HTMLElement>(ref);

  const loadMore = useCallback(async () => {
    setPageNum((num) => num + 1);
  }, []);

  const loading = status === 'loading';

  useEffect(() => {
    setItems([]);
  }, [regionId]);

  useEffect(() => {
    let ignore = false;
    const requestUrl = `${REQUEST_URL.POSTS}?${
      categoryId
        ? `page=${pageNum}&size=10&region=${regionId}&category=${categoryId}`
        : `page=${pageNum}&size=10&region=${regionId}`
    }`;
    const token = localStorage.getItem('Token');
    const options: RequestInit = {
      method: REQUEST_METHOD.GET,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    };

    setStatus('loading');

    fetch(requestUrl, options)
      .then((res) => res.json())
      .then(
        ({ data }: { data: PostsData }) => {
          if (ignore) return;

          setStatus('success');
          setItems((items) => [...items, ...data.posts.content]);
          setIsLast(data.posts.last);
        },
        (error: Error) => {
          setStatus('error');
          setErr(error);
        },
      );

    return () => {
      ignore = true;
    };
  }, [pageNum, regionId, categoryId]);

  if (status === 'error') {
    throw err;
  }

  const { setTarget } = useIntersectionObserver({
    intersect: () => loadMore(),
    root: listRef?.current,
  });
  const isEmpty = items.length === 0;
  const ProductList = items.map((item) => <ProductListItem key={item.id} {...item} />);

  return (
    <S.Main bottom="65px" ref={listRef}>
      {loading && isEmpty && <Loading text="상품을 불러오는 중입니다." />}
      {!loading && isEmpty && <S.ProductNotFound>해당 상품이 없어요.</S.ProductNotFound>}
      {!isEmpty && (
        <>
          <S.ProductList>{ProductList}</S.ProductList>
          {loading && (
            <S.SpinnerLayout>
              <Spinner />
            </S.SpinnerLayout>
          )}
        </>
      )}
      {!loading && !isEmpty && !isLast && <S.Target ref={setTarget}></S.Target>}
    </S.Main>
  );
});

ProductList.displayName = 'ProductList';

export default ProductList;
