import axiosApiSetBaseURL from '../BaseURL';
import qs from 'qs';

// 授業のレビューの取得
export const getAPI = async(params) => {
  const queryParams = qs.stringify(params);
  try {
    const response = await axiosApiSetBaseURL.get(`api/review?${ queryParams }`)
    const data = response.data
    return data
  }
  catch(error) {
    console.log(error);
    throw(error)
  }
}

// レビューの検索
export const searchAPI = async(params) => {
  const fliteredSearchParams = Object.fromEntries(
    Object.entries(params).filter(([key, value]) => value !== null)
  );
  const queryParams = qs.stringify(fliteredSearchParams);
  console.log(queryParams)
  try {
    const response = await axiosApiSetBaseURL.get(`api/review/search?${ queryParams }`)
    const data = response.data;
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