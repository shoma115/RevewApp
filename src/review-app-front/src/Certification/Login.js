import { 
  TextField, 
  FormLabel,
  InputAdornment,
  IconButton, 
  Button 
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import { useLogin } from '../Querys/AuthQuery';
import { Card } from '@mui/material';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const login = useLogin();
  const [ showPassword, setShowPassword ] = useState(false);
  const [ passwordError, setPaswordError ] = useState(false);
  const [ email, setEmail ] = useState(null);
  const [ password, setPassword ] = useState(null);

   // パスワード欄のvisiblityを変更する関数。引数でuseStateのsetを引き渡す
  const handleClickShowPassword = (setUseState) => setUseState((show) => !show);
  //visiblityを変更する際のマウスクリックのデフォルト動作をブロック
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  } 
  const handleLogin = (event) => {
    // ブラウザのデフォルトの動作（リクエストを作成し、リロードを行う）をキャンセルし、設定したログイン動作を行う。
    event.preventDefault();
    login.mutate({email: email, password: password});
    
   
  }

  return (
    <>
      <Card variant="outlined" className='login_card'>   
        <form className='login_form' onSubmit={handleLogin}>
          <FormLabel>ログイン</FormLabel>
          <TextField
            required
            label="鹿大メールアドレス"
            value={email} 
            onChange={(event) => {setEmail(event.target.value)}}
            placeholder="ex)k1234567@kadai.jp"
          ></TextField>
          <div>
          <TextField
            required
            error={passwordError}
            label="パスワード"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(event) => {setPassword(event.target.value)}} 
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => handleClickShowPassword(setShowPassword)}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          ></TextField>
          </div>
          <Button variant="contained" type="submit">ログイン</Button>
          <Link to={"/register"}>新規登録はこちら</Link>
        </form>
      </Card>
    </>
  )
} 

export default LoginPage;