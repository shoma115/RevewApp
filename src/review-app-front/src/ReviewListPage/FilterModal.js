import { 
  Button,
  ToggleButton, 
  ToggleButtonGroup, 
  Dialog, DialogActions, 
  DialogContent, 
  DialogTitle 
} from "@mui/material";

function FilterModal({
  departments, 
  open, 
  handleClose, 
  departmentValues, 
  handleDepartment, 
  majorValues, 
  handleMajor, 
  divisionValues, 
  handleDivision,
  handleSearch,
}) {
  
  const selectDepartmentButton = departments.map(department =>
    <ToggleButton value={department} aria-label={department.name}>
      {department.name}
    </ToggleButton>
  )
  
  // departmentValuesがnullでないことを三項演算子で確認してからmap関数を起動
  const selectMajorButton = departmentValues === null ? '' : departmentValues.majors.map(major =>
    <ToggleButton value={major} aria-label={major.name}>
      {major.name}
    </ToggleButton>
  )

  const selectDivisionButton = majorValues === null ? '' : majorValues.divisions.map(division => 
    <ToggleButton value={division} aria-label={division.name}>
      {division.name}
    </ToggleButton>
  )


  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll='paper'
        maxWidth='md'
        fullWidth={true}
      >
        <DialogTitle>学科以下で絞り込み</DialogTitle>
        <DialogContent dividers>
            <h3>学科</h3>
            <ToggleButtonGroup 
              color="primary"
              exclusive
              value={departmentValues}
              onChange={handleDepartment}
              aria-label='filterDepartment'
              sx={{
                display: 'flex',
                flexWrap: 'wrap', // ここで折り返しを有効にします。
                width: '100%', // 親コンテナの幅に合わせます。
              }}
            >
              {selectDepartmentButton}
            </ToggleButtonGroup>
            <h3>専攻</h3>
            <ToggleButtonGroup
              color="primary"
              exclusive
              value={majorValues}
              onChange={handleMajor}
              aria-label='filterMajor'
              sx={{
                display: 'flex',
                flexWrap: 'wrap', // ここで折り返しを有効にします。
                width: '100%', // 親コンテナの幅に合わせます。
              }}
            >
              {selectMajorButton}
            </ToggleButtonGroup>
            <h3>科目区分</h3>
            <ToggleButtonGroup
               color="primary"
               exclusive
               value={divisionValues}
               onChange={handleDivision}
               aria-label='filterDivision'
               sx={{
                display: 'flex',
                flexWrap: 'wrap', // ここで折り返しを有効にします。
                width: '100%', // 親コンテナの幅に合わせます。
              }}
            >
              {selectDivisionButton}
            </ToggleButtonGroup>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>
              閉じる
            </Button>
            <Button onClick={handleSearch}>
              検索
            </Button>
          </DialogActions>
      </Dialog>
    </>
  )
}

export default FilterModal;