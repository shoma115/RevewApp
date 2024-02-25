import { Button } from "@mui/material";

function FrequentWords({topics}) {
  window.onload = () => {
    
  }

  return (
    <>
      <p>よく出るトピック：</p>
      <Button variant="contained">{topics}</Button>
    </>
  );
}

export default FrequentWords;