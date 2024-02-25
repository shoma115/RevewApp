import * as revivewAPI from "../APIs/ReviewAPI";
import { toastSucsess } from "../commonComponents/Toast";
import { useMutationWithToast } from "../Functions/useMutationWithToast";
import { useQuery, useQueryClient } from "@tanstack/react-query";

// レビュー取得APIへのクエリ
export const useGet = (lessonId) => {
  const { data, error, isLoading, isError} = useQuery({queryKey: ['reviews', lessonId], queryFn: () => revivewAPI.getAPI(lessonId)});
  return {data, isLoading, isError};
}

// レビュー検索APIへのクエリ
export const useSearch = (searchWord, lessonId) => {
  const { data, error, isLoading, isError } = useQuery({queryKey: ['reviews', searchWord, lessonId], queryFn: () => revivewAPI.searchAPI(searchWord, lessonId)});
  return {data, isLoading, isError};
}

// レビュー投稿APIへのクエリ
export const usePost = () => {
  const queryClient = useQueryClient();
  const onSuccess = () => {
    queryClient.invalidateQueries(['reviews'])
    toastSucsess("投稿が完了しました。");
  }

  return useMutationWithToast(
    revivewAPI.postAPI,
    onSuccess,
    "投稿に失敗しました。"
  )
}

// レビューの更新
export const useUpdate = () => {
  const queryClient = useQueryClient();
  const onSuccess = () => {
    queryClient.invalidateQueries(['reviews'])
    toastSucsess("更新しました。");
  }

  return useMutationWithToast(
    revivewAPI.updateAPI,
    onSuccess,
    "更新に失敗しました"
  )
}

// レビューの削除
export const useDelete = () => {
  const queryClient = useQueryClient();
  const onSuccess = () => {
    queryClient.invalidateQueries(['reviews'])
    toastSucsess("削除しました。");
  }

  return useMutationWithToast(
    revivewAPI.deleteAPI,
    onSuccess,
    "削除できませんでした。"
  )
}