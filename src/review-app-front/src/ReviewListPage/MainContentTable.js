import Card from '@mui/material/Card';
import { Link } from 'react-router-dom';
import {Rating} from '@mui/material';

function ReviewBox({ lessons }) {
  console.log(lessons)
  const cards = lessons.map(lesson =>
      <Card variant="outlined" key={ lesson.id } className='lesson'>
        <h3>{ lesson.name }</h3>
        {lesson.teachers.map((teacher) => <h4 key={ teacher.id }>{teacher.name}先生&emsp;</h4>)}
        <h4>総合:
          <Rating 
            precision={0.1} 
            value={lesson.total_evaluation} 
            readOnly>
          </Rating>
        </h4>
        <Link to={"/review"} state={{ lesson: lesson }}>授業詳細/皆の声</Link>
      </Card>
  )

  return (
      <div className='lessons_table'>{cards}</div>
  );

}

function MainContent({ lessons, page }) {
    return (
        <>
          {/* <ContentTitle page={ page } /> */}
          <ReviewBox  lessons={ lessons } />
        </>
    );
}

export default MainContent;

