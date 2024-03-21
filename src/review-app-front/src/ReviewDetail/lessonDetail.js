import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function LessonDetail({ lesson }) {
  const teachers = lesson.teachers.map((teacher) => 
    <spna key={ teacher.id }>{ teacher.name }先生&emsp;</spna>
  );

  const division = lesson.division;
  const major = division.major;
  const department = major.department;
  const faculty = department.faculty;

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell>担当</TableCell>
              <TableCell>{ teachers }</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>単位</TableCell>
              <TableCell>{ lesson.credit }単位</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>学部・学科・専攻</TableCell>
              <TableCell>{ faculty.name }・{ department.name }・{ major.name }</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>科目区分</TableCell>
              <TableCell>{ division.name }</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default LessonDetail;