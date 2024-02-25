import {Rating} from '@mui/material';

function Title() {
  return (
    <h1>みんなの声</h1>
  );
}

function AverageEvaluation({rateEase, rateSatisficaton}) {
  return (
    <>
      <h3>総合</h3>
      <p>楽単：<Rating name="read-only" precision={0.1} value={ rateEase } readOnly ></Rating></p>
      <p>充実：<Rating name="read-only" precision={0.1} value={ rateSatisficaton} readOnly ></Rating></p>
    </>
  )
}

function ReviewTop({ lesson }) {

  return (
    <>
      <Title />
      <AverageEvaluation rateEase={ lesson.reviews_avg_ease } rateSatisficaton={ lesson.reviews_avg_enrichment } />
    </>
  )
  }

export default ReviewTop;