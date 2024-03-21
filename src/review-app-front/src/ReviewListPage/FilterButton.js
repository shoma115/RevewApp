import { useEffect } from 'react';
import getDepMajDiv from './getDep&Maj&Div';

function FilterButton({ facultyId, setDepartments, children }) {
  useEffect(() => {
    getDepMajDiv(facultyId, setDepartments);
  }, [])

  return (
    <div>
      { children }
    </div>
  );
}

export default FilterButton;