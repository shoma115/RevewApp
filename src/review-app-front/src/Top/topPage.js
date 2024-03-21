import {Button} from '@mui/material';
import { useState, useEffect } from 'react';
import getFaculty from './getFacultyAPI.js';
import { Link } from 'react-router-dom';

function SelectFaclty() {
  const [faculties, setFaculties] = useState([])

  useEffect(() => {
    getFaculty(setFaculties);
  }, [])

  const selectButton = faculties.map(faculty =>
    <Link to={"/lesson"} state={{ faculty: faculty.id }}>
      <Button className='select_faculty_button' variant='contained' key={faculty.id}>{ faculty.name }</Button>
    </Link>
  )
  return (
    <div className='select_faculty_button_group'>{ selectButton }</div>
  )
}

function TopPage() {
  return (
    <>
      <div className='toppage'>
        <h2 className='toppage_title'>学生の声箱</h2>
        <h3>講義を受けた学生の生の声が集ります</h3>
        <p>どの学部を見ますか？</p>
        <SelectFaclty />
      </div>
    </>
  )
}

export default TopPage;