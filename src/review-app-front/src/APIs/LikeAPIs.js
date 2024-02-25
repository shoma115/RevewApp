import axiosApiSetBaseURL from '../BaseURL';

export const like = async(params) => {
  try {
    await axiosApiSetBaseURL.post("api/like", params); 
  }
  catch(error) {
    console.log(error);
    throw(error);
  }
  
}

export const unlike = async(urlParam) => {
  try {
    await axiosApiSetBaseURL.delete(`api/unlike?${urlParam}`)
  }
  catch(error) {
    console.log(error);
    throw(error)
  }
}