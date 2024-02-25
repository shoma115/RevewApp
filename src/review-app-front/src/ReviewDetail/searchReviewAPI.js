import axiosApiSetBaseURL from '../BaseURL.js';

function searchReviewAPI(searchWord, lesson, setReview) {
  const searchParams = {
    search: searchWord ? searchWord : null, 
  }

  const fliteredSearchParams = Object.fromEntries(
    Object.entries(searchParams).filter(([key, value]) => value !== null)
  );
  const queryParams = new URLSearchParams(fliteredSearchParams).toString();

  axiosApiSetBaseURL.get(`api/review/search?lesson=${ lesson }&${ queryParams }`)
    .then(response => {
      setReview(response.data.data.reviews);
    })
    .catch(error => {
      console.log(error);
      alert("レビューデータの取得に失敗しました。")
    })
}

export default searchReviewAPI;