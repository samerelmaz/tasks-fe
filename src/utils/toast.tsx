import { toast, ToastOptions } from "react-toastify";

export const errorToast = (message: string, options?: ToastOptions) => {
  return toast.error(message, {
    autoClose: 10000,
    position: "bottom-center",
    ...options,
  });
};
