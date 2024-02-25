import axiosApiSetBaseURL from '../BaseURL';

function getDepMajDiv(facultyId, setDepartments) {
  axiosApiSetBaseURL.get(`api/department?faculty=${facultyId}`)
    .then((response) => {
      setDepartments(response.data.data.departments)
    })
    .catch((error) => {
      alert("データの取得に失敗しました。リロードしてください。")
      console.log(error)
    });
}

export default getDepMajDiv;