import { Pagination } from '@mui/material';

function Paginate({ page, setCurrentPage , methodForQuery}) {
  const handleClick = (event, value) => {
    setCurrentPage(value);
    if(methodForQuery) {
      methodForQuery(value)
    }
    
  }
  return (
    <Pagination count={ page.last_page } page={ page.current_page } color="primary" className='pagenation' onChange={handleClick}/>
  )
}

export default Paginate;