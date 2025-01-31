// Define toast types
import {createContext} from "react";

export type ToastType = "info" | "success" | "error";

// Toast item structure
export interface Toast {
    id: number;
    message: string;
    type: ToastType;
}

// Context type
export interface ToastContextType {
    addToast: (message: string, type?: ToastType, duration?: number) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined);