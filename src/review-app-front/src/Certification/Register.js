import { 
  FormLabel,
  TextField, 
  Button,
  InputAdornment,
  IconButton,
  Input
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import { useRegister } from '../Querys/AuthQuery';
import { toastError } from '../commonComponents/Toast';
import { Card } from '@mui/material';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  const [ name, setName ] = useState(null);
  const [ email, setEmail ] = useState(null);
  const [ password, setPassword ] = useState(null);
  const [ passwordConfirmation, setPasswordConfirmation ] = useState(null);
  const [ showPassword, setShowPassword ] = useState(false);
  const [ showPasswordConfirmation, setShowPasswordConfirmation ] = useState(false);
  const [ passwordError, setPaswordError ] = useState(false);
  const register = useRegister(email, password);

  // パスワード欄のvisiblityを変更する関数
  const handleClickShowPassword = (setUseState) => setUseState((show) => !show);
  //visiblityを変更する際のマウスクリックのデフォルト動作をブロック
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  } 

  const handleRegister = (event) => {
     // ブラウザのデフォルトの動作（リクエストを作成し、リロードを行う）をキャンセルし、設定したログイン動作を行う。
     event.preventDefault();

    // パスワードとパスワード（確認）の照合
    if(password !== passwordConfirmation) {
      toastError("パスワードが一致しません。")
      setPaswordError(true);
      return;
    }
    // 登録のAPIへパラメータを送る
    register.mutate({ name: name, email: email, password: password});
        
  }

  return (
    <>    
      <Card variant="outlined" className='login_card'>   
        <form className='login_form' onSubmit={handleRegister}>
          <FormLabel>新規登録</FormLabel>
          <TextField
            required
            label="ユーザー名" 
            value={name}
            onChange={(event) => {setName(event.target.value)}}
          ></TextField>  
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
            placeholder='6文字以上'
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
          <div>
          <TextField
            required
            error={passwordError}
            label="パスワード（確認用）"
            type={showPasswordConfirmation ? 'text' : 'password'}
            value={passwordConfirmation}
            onChange={(event) => {setPasswordConfirmation(event.target.value)}} 
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => handleClickShowPassword(setShowPasswordConfirmation)}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPasswordConfirmation ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          ></TextField>
          </div>
          <Button variant="contained" type="submit" >登録</Button>
          <Link to={"/login"}>すでにアカウントをお持ちの方</Link>
        </form>
      </Card>
    </>
  )
} 

export default RegisterPage;