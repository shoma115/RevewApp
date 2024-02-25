import 
{ 
  createContext,
  useRef,
  useContext,
 } 
from "react";

const AuthContext = createContext();
export const useAuthContext = () => {
  return useContext(AuthContext);
}

export const AuthProvider = ({children}) => {
  const loginState = useRef(false)
  
  const stateChangeToLogin = () => {
    loginState.current = true;
  }

  const stateChangeToLogout = () => {
    loginState.current = false;
  }

  return (
    <>
      <AuthContext.Provider value={{loginState, stateChangeToLogin, stateChangeToLogout}}>
        {children}
      </AuthContext.Provider>
    </>
  )
}