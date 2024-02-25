import Review from './ReviewCard.js';
import ReviewTop from './reviewTop.js';
import FilterReview from './FilterReview.js';
import FrequentWords from './FrequentWords.js';
import SearchBox from '../commonComponents/SearchBox.js';
import LessonDetail from './lessonDetail.js';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import Icon from '@mui/material/Icon';
import * as reviewQuery from '../Querys/ReviewQuery.js';
import { ReviewPost } from '../ReviewModal/ReviewModal.js';

const ReviewDetail = ()  => {
  // 投稿モーダルの開閉
  const [ open, setOpen ] = useState(false);
  const [onSearch, setOnSearch] = useState(false);
  const [inputValue, setInputValue] = useState(null);
  const [searchWord, setSearchWord] = useState(null)
  const location = useLocation().state.lesson;
  // useQueryを使用しているメソッドは、引数が変化した場合は自動で再フィッチされるので注意。
  const { data, isLoading, isError } = onSearch ? reviewQuery.useSearch(searchWord, location.id) : reviewQuery.useGet(location.id);
  const handleInputChange = (event) => {
    setInputValue(event.target.value); 
  }

  const handleSearch = () => {
    setSearchWord(inputValue);
    setOnSearch(true)
  }

  const handleOpne = () => {
    setOpen(true)
  }

  if(isLoading) {
    return <h1>Loading...</h1>
  }
  else if(isError) {
    return <h1>Error</h1>
  }
  
  return (
    <>
      <LessonDetail lesson={ location }/>
      <ReviewTop lesson={ location }/>
      <FilterReview>
        <SearchBox 
          inputValue={inputValue}
          placeholder="キーワードで検索"
          handleInputvalue={handleInputChange}
          handleSearch={handleSearch} 
        />
        <FrequentWords 
          topics="テスト"
        />
      </FilterReview>
      <Icon sx={{ fontSize: 30 }} onClick={handleOpne}>add_circle</Icon>
        <ReviewPost open={open} setOpen={setOpen} lessonId={location.id} />
      <Review reviews={ data.reviews } />
    </>
  )
}

export default ReviewDetail;

