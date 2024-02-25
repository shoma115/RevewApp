import axiosApiSetBaseURL from '../BaseURL';
import qs from 'qs'

function searchLessonAPI(currentPage, facultyId, department, major, division, search, setLessons, setPage) {
  const searchParams = {
    department: department ? department.id : null,
    major: major ? major.id : null,
    division: division ? division.id : null,
    search: search ? search : null,
  }

  const fliteredSearchParams = Object.fromEntries(
    Object.entries(searchParams).filter(([key, value]) => value !== null)
  );
  const queryParams = qs.stringify(fliteredSearchParams);

  axiosApiSetBaseURL(`api/lesson/search?currentPage=${currentPage}&faculty=${facultyId}&${queryParams}`)
    .then((response) => {
      setLessons(response.data.data.lessons);
      setPage(response.data.meta);
      console.log("起動!")
    })
    .catch((error) => {
      console.log(error)
      alert("データの取得に失敗しました。再読み込みしてください。")
    })
}

export default searchLessonAPI;