import axiosApiSetBaseURL from '../BaseURL';
import qs from 'qs';

// 授業のレビューの取得
export const getAPI = async(lesson) => {
 try {
  const response = await axiosApiSetBaseURL.get(`api/review?lesson=${ lesson }`)
  const data = response.data.data
  return data
 }
 catch(error) {
  console.log(error);
  throw(error)
 }
}

// レビューの検索
export const searchAPI = async(searchWord, lesson) => {
  const searchParams = {
    search: searchWord ? searchWord : null, 
  }

  const fliteredSearchParams = Object.fromEntries(
    Object.entries(searchParams).filter(([key, value]) => value !== null)
  );
  const queryParams = qs.stringify(fliteredSearchParams);
  try {
    const response = await axiosApiSetBaseURL.get(`api/review/search?lesson=${ lesson }&${ queryParams }`)
    const data = response.data.data;
    return data
  }
  catch(error) {
    console.log(error)
    throw(error);
  }
}

// 授業レビューの投稿
export const postAPI = async(params) => {
  try {
    await axiosApiSetBaseURL.post("/api/review", params)
  }
  catch(error) {
    console.log(error);
    throw(error)
  }
  
}

export const updateAPI = async({reviewId, params}) => {
  try {
    await axiosApiSetBaseURL.patch(`/api/review/${reviewId}`, params)
  }
  catch(error) {
    console.log(error);
    throw(error)
  }
  
}

export const deleteAPI = async({ reviewId } ) => {
  try {
    await axiosApiSetBaseURL.delete(`/api/review/${reviewId}`)
  }
  catch(error) {
    console.log(error);
    throw(error)
  }
  
}