import { TextField, Button } from "@mui/material";

function SearchBox({inputValue,placeholder, handleInputvalue, handleSearch}) {
  return ( 
    <>
      <TextField
        value={inputValue} 
        size="small" 
        placeholder={placeholder}
        onChange={handleInputvalue}
      >
      </TextField>
      <Button
        onClick={handleSearch} 
        variant="outlined" 
        type="submit"
      >
        検索
      </Button>
    </>
  );
}

export default SearchBox;