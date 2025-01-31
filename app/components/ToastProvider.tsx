import {ReactNode, useState} from "react";
import {Toast, ToastContext, ToastType} from "~/model/toast";
import ToastContainer from "~/components/ToastContainer";

export const ToastProvider = ({ children }: {children: ReactNode}) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const addToast = (message: string, type: ToastType = "info", duration: number = 3000) => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, message, type }]);

        setTimeout(() => {
            removeToast(id);
        }, duration);
    };

    const removeToast = (id: number) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    };

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <ToastContainer toasts={toasts} />
        </ToastContext.Provider>
    );
};

