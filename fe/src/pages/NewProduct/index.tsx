import { useState, ChangeEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { REQUEST_URL } from '@constants/index';
import { ICON_NAME, PATH } from '@constants/index';

import useFetch, { REQUEST_METHOD } from '@hooks/useFetch';

import Icon from '@components/common/Icon';
import ImageInput from '@components/ImageInput';
import TitleInput from '@components/TitleInput';
import CategoryList from '@components/CategoryList';
import ModalPortal from '@components/ModalPortal';
import * as S from './style';

export interface Category {
  id: number;
  name: string;
}

interface Region {
  id: number;
  name: string;
}

interface RegionData {
  regions: Region[];
}

interface Product {
  id: number;
}

const NewProduct = () => {
  const [images, setImages] = useState<File[]>([]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState({
    id: 0,
    name: '',
  });
  const [price, setPrice] = useState('');
  const [content, setContent] = useState('');
  // const [region, setRegion] = useState('');

  const [isOpenCategory, setIsOpenCategory] = useState(false);

  const handleImageUpload = (selectedFiles: FileList) => {
    const selectedFilesArray = Array.from(selectedFiles);
    const imagesArray: File[] = selectedFilesArray.map((file: File) => {
      return file;
    });

    setImages((previousImages) => [...previousImages, ...imagesArray]);
  };

  const handleImageDelete = (image: File) => {
    setImages((previousImages) => previousImages.filter((img) => img !== image));
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTitle(value);
  };

  const handleCategoryToggleClick = () => {
    setIsOpenCategory((prev) => !prev);
  };

  const handleCategorySelectClick = ({ id, name }: Category) => {
    setCategory({
      id,
      name,
    });
  };

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPrice(value);
  };

  const contentChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setContent(value);
  };

  const token = localStorage.getItem('Token');

  const { responseState: getRegionState, data: regionData } = useFetch<RegionData>({
    url: REQUEST_URL.USER_REGIONS,
    options: {
      method: REQUEST_METHOD.GET,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    },
  });

  const currentRegion = getRegionState === 'SUCCESS' ? regionData?.regions[0].name.split(' ')[2] : '';

  const {
    responseState: postSubmitState,
    fetchData,
    data: productData,
  } = useFetch<Product>({
    url: REQUEST_URL.POSTS,
    options: {
      method: REQUEST_METHOD.POST,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    },
    skip: true,
  });

  const handleSubmitClick = async () => {
    const navigate = useNavigate();
    const formData = new FormData();

    formData.append('title', title);
    formData.append('regionId', `${1}`);
    formData.append('categoryId', category.id.toString());
    formData.append('price', price);
    formData.append('badgeId', `${1}`);
    formData.append('content', content);

    if (images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        formData.append('photos', images[i]);
      }
    }

    if (postSubmitState === 'IDLE') {
      await fetchData(formData);
    }

    if (postSubmitState === 'SUCCESS') {
      navigate(`${PATH.PRODUCT_DETAIL}/${productData?.id}`, { state: { beforePage: PATH.NEW_PRODUCT } });
    }

    if (postSubmitState === 'ERROR') {
      alert('상품 등록에 실패했습니다.');
      return;
    }
  };

  return (
    <>
      {isOpenCategory && (
        <ModalPortal>
          <CategoryList
            category={category}
            onCategoryToggleClick={handleCategoryToggleClick}
            onCategorySelectClick={handleCategorySelectClick}
          />
        </ModalPortal>
      )}
      <S.Header>
        <Link to={PATH.HOME}>
          <S.CloseButton>닫기</S.CloseButton>
        </Link>
        <span>내 물건 팔기</span>
        <S.CompleteButton onClick={handleSubmitClick}>완료</S.CompleteButton>
      </S.Header>
      <S.LayoutContent>
        <ImageInput onChange={handleImageUpload} onDelete={handleImageDelete} images={images} />
        <TitleInput
          title={title}
          category={category}
          onChange={handleTitleChange}
          onCategoryToggleClick={handleCategoryToggleClick}
          onCategorySelectClick={handleCategorySelectClick}
        />
        <S.TextInput onChange={handlePriceChange} placeholder="₩ 가격 (선택사항)" />
        <S.TextArea
          onChange={contentChangeHandler}
          placeholder={`${currentRegion}에 올릴 게시물 내용을 작성해주세요.(판매금지 물품은 게시가 제한될 수 있어요.)`}
        />
      </S.LayoutContent>
      <S.TabBar>
        <S.RegionSettingButton>
          <Icon name={ICON_NAME.REGION_SETTING} fill="black" size={20} />
          <span>{currentRegion}</span>
        </S.RegionSettingButton>
        <S.Keyboard>
          <Icon name={ICON_NAME.KEYBOARD} fill="black" size={20} />
        </S.Keyboard>
      </S.TabBar>
    </>
  );
};

export default NewProduct;
