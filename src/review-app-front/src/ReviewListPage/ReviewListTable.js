import FilterLessonTable from './FilterTable.js';
import FilterButton from './FilterButton.js';
import SearchBox from '../commonComponents/SearchBox.js';
import FilterModal from './FilterModal';
import MainContent from './MainContentTable.js';
import Paginate from './Paginate.js';
import { useEffect, useState } from 'react';
import getLessonAPI from './getLessonAPI.js';
import searchLessonAPI from './searchLessonAPI.js';
import { useLocation } from 'react-router-dom';
import { Icon } from '@mui/material';

function ReviewList() {
  const [lessons, setLessons] = useState([]);
  const [page, setPage] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [onSearch, setOnSearch] = useState(false);
  const facultyId = useLocation().state.faculty;
  // 以下、FilterModalに受け渡すもの
  const [departments, setDepartments] = useState([]);
  const [departmentValues, setDepartmentValues] = useState(null);
  const handleDepartment = (event, newDepartmentValues) => {
    setDepartmentValues(newDepartmentValues);
    setMajorValues(null);
    setDivisionValues(null);
  }
  const [majorValues, setMajorValues] = useState(null);
  const handleMajor = (event, newMajorValues) => {
    setMajorValues(newMajorValues);
    setDivisionValues(null);
  }
  const [divisionValues, setDivisionValues] = useState(null);
  const handleDivision = (event, newDivisionValues) => {
    setDivisionValues(newDivisionValues);
  }
 
  const [opne, setOpen] = useState(false);
  const handleOpne  = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [inputValue, setInputValue] = useState(null);
  const handleInputChange = (event) => {
    setInputValue(event.target.value); 
  }

  const handleSearch = () => {

    searchLessonAPI(
      currentPage, 
      facultyId, 
      departmentValues, 
      majorValues, 
      divisionValues, 
      inputValue, 
      setLessons, 
      setPage
    )
    setOnSearch(true);
    handleClose();
  }
  
  useEffect(() => {

    // 検索がかかっていたら、検索APIを実行。そうでなければ通常のAPIを実行
    onSearch ? 
      searchLessonAPI
      (
        currentPage, 
        facultyId, 
        departmentValues, 
        majorValues, 
        divisionValues, 
        inputValue, 
        setLessons, 
        setPage
      ) :
      getLessonAPI
      (
        currentPage, 
        facultyId, 
        setLessons, 
        setPage
      );
  // setCurrentPageをpropとして子のpaginateに渡しており、ページを変更するごとにcurrentPageが再設定される。
  // つまり、依存配列にcurrentPageを設定することで、ページを移動するごとにAPIが起動する。マウント時もちゃんと起動するので安心してね
  }, [currentPage])

    // lessonsをpropとしてMainContentに引き渡し、MainContentからReviewBoxへlessonsが引き渡される
  return (
    <>
      <div>
        {/* childrenプロップで、子コンポーネントを渡している */}
        <FilterLessonTable>
          <SearchBox 
            inputValue={inputValue}
            placeholder="授業名で検索"
            handleInputvalue={handleInputChange}
            handleSearch={handleSearch}  
          />
          <FilterButton facultyId={facultyId} setDepartments={setDepartments}>
            <p>
              学科以下で絞り込み
              <Icon color="primary" onClick={ handleOpne }>add_circle</Icon>
            </p>
            <FilterModal 
              departments={departments}  
              open={opne} 
              handleClose={handleClose} 
              departmentValues={departmentValues} 
              handleDepartment={handleDepartment}
              majorValues={majorValues} 
              handleMajor={handleMajor} 
              divisionValues={divisionValues} 
              handleDivision={handleDivision}
              handleSearch={handleSearch}
            />
          </FilterButton>
        </FilterLessonTable>
        <MainContent lessons={ lessons } page={ page } />
        <Paginate page={ page } setCurrentPage={ setCurrentPage }/>
      </div>
    </>
  )
}

export default ReviewList;
