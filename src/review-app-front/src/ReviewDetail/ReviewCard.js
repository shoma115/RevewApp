import {Avatar, Rating } from '@mui/material';
import { useUser } from '../Querys/AuthQuery';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { ReviewUpdate, ReviewDelete } from '../ReviewModal/ReviewModal';
import { useState } from 'react';
import LikeButton from './LikeButton.js';

function Review({ reviews }) {
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
          <DeleteIcon onClick={() => handleDeleteDialogOpen(review)}></DeleteIcon>
          <EditIcon onClick={() => handleUpdateDialogOpen(review)}></EditIcon>
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
      <div key={review.id}>
        <div>{ edit(data, isLoading, isError, review) }</div>
        <div className='userOnReview'>
          <Avatar />
          <span>{ review.user.name }</span>
        </div>
        <div>
          <div>楽単：<Rating value={ review.ease } readOnly/></div>
          <div>充実：<Rating value={ review.enrichment } readOnly/></div>
        </div>
        <h3>{ review.title }</h3>
        <p>{ review.content }</p>
        <LikeButton review={review}/>
      </div>
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