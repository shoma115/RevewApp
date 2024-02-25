import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import { useLikeStore, useLikeDelete } from "../Querys/LikeQuery";
import qs from 'qs'
import { useUser } from "../Querys/AuthQuery";

const LikeButton = (review) => {
  const { data } = useUser();
  const likeStore = useLikeStore();
  const likeDelete = useLikeDelete();
  const params = {review_id: review.review.id};
  const [ like, setLike ] = useState(false);
  const [ buttonVariant, setButtonVariant ] = useState("outlined")
  
  const handleClick = () => {
    // LikeがTureの時、つまりボタンが既に押されているとき
    if(like) {
      const urlParam = qs.stringify(params)
      setButtonVariant("outlined");
      likeDelete.mutate(urlParam)
    }
    // Likeがfalseの時、つまりボタンが押されていないとき
    else {   
      setButtonVariant("contained");
      likeStore.mutate(params)
    }
    setLike(!like);
  }

  // ユーザーが過去にいいねを押しているかどうかでデフォルトのレイアウトとlikeステイトを切り替える
  useEffect(() => {
    if(data) {
      for(let i = 0; i < review.review.likes.length; i++) { 
        console.log(review.review.likes[i]["user_id"])
        if(review.review.likes[i]["user_id"] == data.data.id) {
          setLike(true);
          setButtonVariant("contained");
          break
        }
      }
    }
  }, [data])

  return (
    <>
      <Button 
        startIcon={<ThumbUpOffAltOutlinedIcon />}
        variant={ buttonVariant } 
        onClick={handleClick}
        >
          {review.review.likes.length}
      </Button>
    </>
  )
}

export default LikeButton;