import { useMutationWithToast } from "../Functions/useMutationWithToast";
import * as likeAPI from "../APIs/LikeAPIs";
import { useQueryClient } from "@tanstack/react-query";

export const useLikeStore = () => {
  const queryClient = useQueryClient();
  const onSuccess = () => {
    queryClient.invalidateQueries(['reveiws']);
  }
  return useMutationWithToast(
    likeAPI.like,
    onSuccess,
    "失敗しました。"
  )
}

export const useLikeDelete = () => {
  const queryClient = useQueryClient();
  const onSuccess = () => {
    queryClient.invalidateQueries(["reviews"])
  }

  return useMutationWithToast(
    likeAPI.unlike,
    onSuccess,
    "失敗しました。"
  )

}
