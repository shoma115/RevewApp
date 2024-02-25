import { 
  Button,
  TextField,  
  Dialog, DialogActions, 
  DialogContent, 
  Rating,
  FormLabel, 
  FormControl,
  Grid
} from "@mui/material";
import { useState } from "react";
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import qs from 'qs';
import * as reviewQuery from "../Querys/ReviewQuery";

export const ReviewPost = ({ open, setOpen, lessonId }) => {
  const postQuery = reviewQuery.usePost();
  const [ ease, setEase ] = useState(0);
  const [ enrichment, setEnrichment ] = useState(0);
  const changeEaseValue = (event, newValue) => {
    setEase(newValue);
  }
  const changeEnrichmentValue = (event, newValue) => {
    setEnrichment(newValue);
  }
  const handleClose = () => {
    setOpen(false);
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll='paper'
        maxWidth='sm'
        fullWidth={true}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            formData.append("lesson_id", lessonId);
            // フォームに入力された情報をリスト型で出力
            const formJson = Object.fromEntries(formData.entries());
            // query用の文字列化
            const params = qs.stringify(formJson)
            postQuery.mutate(params)
            handleClose();
          },
        }}
      >
        <DialogActions>  
          <Button type="submit" startIcon={< SendIcon />}variant="contained">
            投稿
          </Button>
        </DialogActions>
        <DialogContent dividers>
          <FormLabel><h3>評価</h3></FormLabel>
          <div>楽単：
            <Rating 
              name="ease" 
              size="large" 
              value={ease}
              onChange={changeEaseValue} 
            />
          </div>
          <div>充実：
            <Rating 
              name="enrichment" 
              size="large" 
              value={enrichment} 
              onChange={changeEnrichmentValue} 
            />
          </div>
          <FormControl fullWidth sx={{ m: 1}}>
            <FormLabel><h3>タイトル</h3></FormLabel>
            <TextField
              name="title"
              size="small"
              required
            ></TextField>
          </FormControl>
          <FormControl fullWidth sx={{ m: 1 }}>
            <FormLabel><h3>レビュー</h3></FormLabel>
              <TextField
                name="content"
                required
                multiline
                maxRows={10}
              ></TextField>
          </FormControl>
        </DialogContent>
      </Dialog>
    </>
  )
}

export const ReviewUpdate = ({ open, setOpen, review }) => {
  const updateQuery = reviewQuery.useUpdate();
  const handleClose = () => {
    setOpen(false);
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll='paper'
        maxWidth='sm'
        fullWidth={true}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            // フォームに入力された情報をリスト型で出力
            const formJson = Object.fromEntries(formData.entries());
            // query用の文字列化
            const params = qs.stringify(formJson)
            updateQuery.mutate({reviewId: review.id, params: params})
            handleClose();
          },
        }}
      >
        <DialogActions>  
          <Button type="submit" startIcon={< SendIcon />}variant="contained">
            更新
          </Button>
        </DialogActions>
        <DialogContent dividers>
          <FormLabel><h3>評価</h3></FormLabel>
          <div>楽単：
            <Rating 
              name="ease" 
              size="large"  
              defaultValue={review ? review.ease : 0}
            />
          </div>
          <div>充実：
            <Rating 
              name="enrichment" 
              size="large" 
              defaultValue={review ? review.enrichment : 0} 
            />
          </div>
          <FormControl fullWidth sx={{ m: 1}}>
            <FormLabel><h3>タイトル</h3></FormLabel>
            <TextField
              name="title"
              size="small"
              defaultValue={review ? review.title : null}
              required
            ></TextField>
          </FormControl>
          <FormControl fullWidth sx={{ m: 1 }}>
            <FormLabel><h3>レビュー</h3></FormLabel>
              <TextField
                name="content"
                required
                multiline
                defaultValue={review ? review.content : null}
                maxRows={10}
              ></TextField>
          </FormControl>
        </DialogContent>
      </Dialog>
    </>
  )
}

export const ReviewDelete = ({ open, setOpen, review }) => {
  const deleteQuery = reviewQuery.useDelete();
  const handleClose = () => {
    setOpen(false);
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll='paper'
        maxWidth='sm'
        fullWidth={true}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            deleteQuery.mutate({reviewId: review.id})
            handleClose();
          },
        }}
      >  
        <DialogContent>
          レビューを削除しますか？
          <DialogActions> 
          <Grid container spacing={8} justifyContent="center" alignItems="center" >
            <Grid item>
              <Button type="submit" startIcon={< DeleteIcon />} variant="contained" color="error">
                削除
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={handleClose}>
                キャンセル  
              </Button>
            </Grid> 
          </Grid>  
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  )
}
