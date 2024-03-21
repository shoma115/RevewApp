import Review from './ReviewCard.js';
import FilterReview from './FilterReview.js';
import SearchBox from '../commonComponents/SearchBox.js';
import LessonDetail from './lessonDetail.js';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import * as reviewQuery from '../Querys/ReviewQuery.js';
import { ReviewPost } from '../ReviewModal/ReviewModal.js';
import { RaderChart } from '../commonComponents/Chart.js';
import { Button } from '@mui/material';
import Paginate from '../commonComponents/Paginate.js';

const ReviewDetail = ()  => {
  // 投稿モーダルの開閉
  const [ open, setOpen ] = useState(false);
  const [onSearch, setOnSearch] = useState(false);
  const [inputValue, setInputValue] = useState(null);
  const [searchWord, setSearchWord] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const lesson = useLocation().state.lesson;
  const [ normalQueryPrams, setNormalQueryParams ] = useState({
    lesson : lesson.id,
    page : currentPage,
  });
  const [ searchQueryParams, setSearchQueryParams ] = useState({
    lesson : lesson.id,
    search : searchWord,
    page : currentPage
  });
  // useQueryを使用しているメソッドは、引数が変化した場合は自動で再フィッチされるので注意。
  const { data, isLoading, isError } = onSearch ? reviewQuery.useSearch(searchQueryParams) : reviewQuery.useGet(normalQueryPrams); 
  // 検索ボックスの入力値の変更
  const handleInputChange = (event) => {
    // seInputValueは必要ないかも。変更するのが怖いので残しておきます
    setInputValue(event.target.value);
    setSearchWord(event.target.value);
  }
  
  const handleSearch = () => {
    // setSearchWord(inputValue);
    setSearchQueryParams(searchQueryParams => {
      return {
        // ...はスプレッド構文。配列を展開（コピー）して、searchのみ更新する。
        ...searchQueryParams,
        search: searchWord,
      }
    });
    setOnSearch(true);
  }

  const handleOpen = () => {
    setOpen(true)
  }
  
  if(isLoading) {
    return <h1>Loading...</h1>
  }
  else if(isError) {
    return <h1>Error</h1>
  }
  console.log(data.meta)
  return (
    <>
      <div className='lesson_detail_table'>
        <h2 className='lesson_name'>{ lesson.name }</h2>
        <div className='reder_chart'>
          <RaderChart props={ lesson }/>
        </div>
        <div className='lesson_info'>
          <LessonDetail lesson={ lesson }/>
        </div>  
        <h3>レビュー</h3>
        <FilterReview>
          <SearchBox 
            inputValue={inputValue}
            placeholder="キーワードで検索"
            handleInputvalue={handleInputChange}
            handleSearch={handleSearch} 
          />
        </FilterReview>
        <div className='review_post_button'>
          <Button onClick={handleOpen} variant="contained" >レビューを投稿</Button>
          <ReviewPost open={open} setOpen={setOpen} lessonId={lesson.id} />
        </div>
        <Review reviews={ data.data.reviews } />
        <Paginate 
          page={data.meta} 
          setCurrentPage={setCurrentPage}
          methodForQuery={(value) => {
            if(onSearch) {
              setSearchQueryParams(searchQueryParams => {
                return {
                  // ...はスプレッド構文。配列を展開（コピー）して、searchのみ更新する。
                  ...searchQueryParams,
                  page: value,
                }
              })
            }
            else {
              setNormalQueryParams(normalQueryPrams => {
                return {
                  ...normalQueryPrams,
                  page: value,
                }
              })
            }
          }}  
        ></Paginate>
      </div>
    </>
  )
}

export default ReviewDetail;

