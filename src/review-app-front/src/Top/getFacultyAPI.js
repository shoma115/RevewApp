import axiosApiSetBaseURL from '../BaseURL';

function getFaculty(setFaculties) {
  axiosApiSetBaseURL.get('api/faculty')
    .then((response) => {
      setFaculties(response.data.data.faculties);
    })
    .catch((error) => {
      alert("学部データの取得に失敗しました。リロードしてください");
      console.log(error);
    });
}

export default getFaculty;