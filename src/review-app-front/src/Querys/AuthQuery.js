import { useQuery, useQueryClient } from '@tanstack/react-query';
import * as authApi from '../APIs/AuthAPI';
import { toastSucsess } from '../commonComponents/Toast';
import { useMutationWithToast } from '../Functions/useMutationWithToast';
import { useNavigate } from "react-router-dom";
import { useAuthContext } from '../commonComponents/AuthProvider';

export const useUser = () => {
  const { data, error, isLoading, isError } = useQuery({queryKey: ['users'], queryFn: authApi.getUsers});
  return {data, isLoading, isError};
}

export const useRegister = (email, password) => {
  const login = useLogin();
  const queryClient = useQueryClient();
  const onSuccess = () => {
    // usersキーのクエリを無効化。データの再フィッチを行い、キャッシュのデータを最新に保つ。
    queryClient.invalidateQueries(['users']);
    toastSucsess('登録に成功しました。');
    login.mutate({email: email, password: password})
  } 

  return useMutationWithToast(
    authApi.register,
    onSuccess,
    '登録に失敗しました',
  )
};

export const useLogin = () => {
  const { stateChangeToLogin } = useAuthContext();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const onSuccess = () => {
    // usersキーのクエリを無効化。データの再フィッチを行い、キャッシュのデータを最新に保つ。
    queryClient.invalidateQueries(['users']);
    toastSucsess('ログインに成功しました');
    // ユーザーのログイン状態のstateをtrueに
    stateChangeToLogin();
    // ホーム画面にリダイレクト
    navigate('/');
  } 

  return useMutationWithToast(
    authApi.login, 
    onSuccess, 
    'ログインに失敗しました',
    )
};

export const useLogout = () => {
  const { stateChangeToLogout } = useAuthContext();
  const queryClient = useQueryClient();
  const onSuccess = () => {
    // usersキーのクエリを無効化。データの再フィッチを行い、キャッシュのデータを最新に保つ。
    queryClient.invalidateQueries(['users']);
    toastSucsess('ログアウトしました。');
    // ログインstateをfalseに
    stateChangeToLogout();
  } 

  return useMutationWithToast(
    authApi.logout,
    onSuccess,
    'ログアウトに失敗しました。',
  )
};