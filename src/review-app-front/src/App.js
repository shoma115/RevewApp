import ReviewList from "./ReviewListPage/ReviewListTable";
import ReviewDetail from "./ReviewDetail/reviewDetailTable";
import TopPage from "./Top/topPage";
import LoginPage from "./Certification/Login";
import RegisterPage from "./Certification/Register";
import { Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from "./commonComponents/AuthProvider";
import { AuthGuard } from "./commonComponents/AuthGuard";

const queryClient = new QueryClient({
  defaultOptions: {
    refetchOnWindowFocus: false,
  }
})

function App() {

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <div>
            <ToastContainer />
              <Routes>
                <Route path='/' element={ <AuthGuard component={<TopPage />} redirect='/login' /> }></Route>
                <Route path='/register' element={ <RegisterPage /> }></Route>
                <Route path='/login' element={ <LoginPage /> }></Route>
                <Route path='/lesson' element={ <AuthGuard component={<ReviewList />} redirect='/login' /> }></Route>
                <Route path='/review' element={ <AuthGuard component={<ReviewDetail />} redirect='/login' /> }></Route>
              </Routes>
            <ToastContainer />
          </div>
        </AuthProvider>
      </QueryClientProvider>
    </>
  )
}

export default App;
