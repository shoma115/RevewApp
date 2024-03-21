import {Avatar, Rating } from '@mui/material';
import { useUser } from '../Querys/AuthQuery';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { ReviewUpdate, ReviewDelete } from '../ReviewModal/ReviewModal';
import { useState } from 'react';
import LikeButton from './LikeButton.js';
import Card from '@mui/material/Card';

function Review({ reviews }) {
  const numberOfEvals = 6.0;
  const [ updateOpen, setUpdateOpen ] = useState(false)
  const [ updateReview, setUpdateReview ] = useState(null)
  const handleUpdateDialogOpen = (review) => {
    setUpdateReview(review)
    setUpdateOpen(true)
  }

  const [ deleteOpen, setDeleteOpen ] = useState(false)
  const [ deleteReview, setDeleteReview ] = useState(null)
  const handleDeleteDialogOpen = (review) => {
    setDeleteReview(review);
    setDeleteOpen(true)
  }
  

  const { data, isLoading, isError } = useUser();
  // レビューの編集ボタンの表示非表示
  
  const edit = (data, isLoading, isError, review) => {
    if(isLoading) {
      return <div>Loading</div>
    }
    else if(isError) {
      return <div>Error...</div>
    }
    else if(data) {
      if(data.data.id === review.user.id) {
        return (
        <>
          <EditIcon onClick={() => handleUpdateDialogOpen(review)}></EditIcon>
          <DeleteIcon onClick={() => handleDeleteDialogOpen(review)}></DeleteIcon>
        </>
        )
      } else {
        return <div></div>
      }
      
    }
    else {
      return <div>受け取れません</div>
    }
  }
  const reviewCard = reviews.map((review) =>
    <>
      <Card className='review' variant="outlined" key={review.id}>
        <div className='review_edit'>{ edit(data, isLoading, isError, review) }</div>
        <div className='userOnReview'>
          <Avatar />
          <span>{ review.user.name }</span>
        </div>
        <div>
          <div>総合：
            <Rating
              precision={0.1} 
              value={ parseFloat(review.ease + review.opinion + review.assignment + review.communication + review.expertise + review.growth) / numberOfEvals} 
              readOnly
            />
          </div>
        </div>
        <h3>{ review.title }</h3>
        <p>{ review.content }</p>
        <LikeButton review={review}/>
      </Card>
    </>
  )

  return (
    <>
      <ReviewDelete
        open={deleteOpen}
        setOpen={setDeleteOpen}
        review={deleteReview}
      />
      <ReviewUpdate 
        open={updateOpen} 
        setOpen={setUpdateOpen}
        review={updateReview}
      />
      <div>{ reviewCard }</div>
    </>
  )
}

export default Review;