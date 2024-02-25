import { Pagination } from '@mui/material';

function Paginate({ page, setCurrentPage}) {
  const handleClick = (event, value) => {
    setCurrentPage(value);
  }

  return (
    <Pagination count={ page.last_page } page={ page.current_page } variant="outlined" shape="rounded" onChange={handleClick}/>
  )
}

export default Paginate;