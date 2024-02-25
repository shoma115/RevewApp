import { toast } from 'react-toastify';

export const toastSucsess = (message) => {
  toast.success(message, {
    position: "top-center"
  })
}

export const toastError = (message) => {
  toast.error(message, {
    position: "top-center"
  })
}