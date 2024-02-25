import {Button} from '@mui/material';
import { useState, useEffect } from 'react';
import getFaculty from './getFacultyAPI.js';
import { Link } from 'react-router-dom';

function Title() {
  return (
    <h1>学部はどこですか？</h1>
  )
}

function SelectFaclty() {
  const [faculties, setFaculties] = useState([])

  useEffect(() => {
    getFaculty(setFaculties);
  }, [])

  const selectButton = faculties.map(faculty =>
    <Link to={"/lesson"} state={{ faculty: faculty.id }}>
      <Button variant='contained' key={faculty.id}>{ faculty.name }</Button>
    </Link>
  )
  return (
    <div>{ selectButton }</div>
  )
}

function TopPage() {
  return (
    <>
      <Title />
      <SelectFaclty />
    </>
  )
}

export default TopPage;