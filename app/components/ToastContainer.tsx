import {createContext, ReactNode, useState} from "react";
import {Toast, ToastContextType, ToastType} from "~/model/toast";

const ToastContext = createContext<ToastContextType | undefined>(undefined);

const ToastContainer = ({ toasts }: {toasts: Toast[]}) => {
    return (
        <div className="fixed top-5 right-5 space-y-2 z-50">
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    className={`p-3 rounded shadow-md text-white ${
                        toast.type === "success"
                            ? "bg-green-500"
                            : toast.type === "error"
                                ? "bg-red-500"
                                : "bg-gray-700"
                    }`}
                >
                    {toast.message}
                </div>
            ))}
        </div>
    );
};

export default function ToastProvider ({ children }: {children: ReactNode}) {
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
