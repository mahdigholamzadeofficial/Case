import { create } from "zustand";

export interface ErrorType {
  errorStatus: boolean;
  errorUserMessage: string | null;
}

interface IErrorState {
  errorData: ErrorType;
  setErrorData: (arg: ErrorType) => void;
}
export const useErrorStore = create<IErrorState>((set) => ({
  errorData: {
    errorUserMessage: "",
    errorStatus: false,
  },
  setErrorData: (arg: ErrorType) => set({ errorData: arg }),
}));
