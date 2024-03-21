// 授業一覧画面の検索機能をまとめてラッピングしている。構造を分かりやすくするために実装
function FilterLessonTable({ children }) {
  return (
    <div className='filter_table'>
      <div>
      { children }
      </div>
    </div>
  );
}

export default FilterLessonTable;